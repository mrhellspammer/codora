package com.codora.backend.service;

import com.codora.backend.dto.ForgotPasswordRequest;
import com.codora.backend.dto.OtpVerificationRequest;
import com.codora.backend.dto.PasswordResetRequest;
import com.codora.backend.model.Admin;
import com.codora.backend.model.OtpToken;
import com.codora.backend.model.User;
import com.codora.backend.repository.AdminRepository;
import com.codora.backend.repository.OtpTokenRepository;
import com.codora.backend.repository.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class ForgotPasswordService {

    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final OtpTokenRepository otpTokenRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Value("${otp.expiry.minutes:10}")
    private int otpExpiryMinutes;

    // This method handles the "Forgot Password" request and sends OTP to the given email
    public String sendOtp(ForgotPasswordRequest request, String role) {
        String email = request.getEmail();

        // Check if the email exists in the respective table
        boolean exists = role.equals("USER") ?
                userRepository.existsByEmail(email) :
                adminRepository.existsByEmail(email);

        if (!exists) {
            throw new RuntimeException("No " + role.toLowerCase() + " account registered with this email.");
        }

        // Generate 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));

        // Set expiry time (e.g., 10 minutes from now)
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(otpExpiryMinutes);

        // Remove any existing OTP for this email-role combo
        otpTokenRepository.deleteByEmailAndRole(email, role);

        // Save new OTP to DB
        OtpToken token = OtpToken.builder()
                .email(email)
                .otp(otp)
                .role(role)
                .expiresAt(expiry)
                .build();

        otpTokenRepository.save(token);

        // Send email (emailService will format and send it)
        try {
            emailService.sendOtpEmail(email, otp);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send OTP email. Try again.");
        }

        return "OTP sent successfully to " + email;
    }

    // This method verifies if the OTP entered by user is correct and valid
    public String verifyOtp(OtpVerificationRequest request, String role) {
        OtpToken token = otpTokenRepository
                .findByEmailAndRole(request.getEmail(), role)
                .orElseThrow(() -> new RuntimeException("No OTP found. Please request a new one."));

        // Check if OTP matches
        if (!token.getOtp().equals(request.getOtp())) {
            throw new RuntimeException("Incorrect OTP. Please try again.");
        }

        // Check if OTP is expired
        if (token.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired. Please request a new one.");
        }

        return "OTP verified successfully.";
    }

    // This method resets the user's password after successful OTP verification
    public String resetPassword(PasswordResetRequest request, String role) {
        String encodedPassword = passwordEncoder.encode(request.getNewPassword());

        if (role.equals("USER")) {
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found."));
            user.setPassword(encodedPassword);
            userRepository.save(user);
        } else {
            Admin admin = adminRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Admin not found."));
            admin.setPassword(encodedPassword);
            adminRepository.save(admin);
        }

        // Clean up used OTP
        otpTokenRepository.deleteByEmailAndRole(request.getEmail(), role);

        return "Password reset successful.";
    }
}
