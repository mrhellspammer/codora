package com.codora.backend.controller;

import com.codora.backend.dto.ForgotPasswordRequest;
import com.codora.backend.dto.OtpVerificationRequest;
import com.codora.backend.dto.PasswordResetRequest;
import com.codora.backend.service.ForgotPasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class ForgotPasswordController {

    private final ForgotPasswordService forgotPasswordService;

    // ======== USER ROUTES ========

    // Step 1: User requests OTP to reset password
    @PostMapping("/user/forgot-password")
    public ResponseEntity<?> userForgotPassword(@RequestBody ForgotPasswordRequest request) {
        String msg = forgotPasswordService.sendOtp(request, "USER");
        return ResponseEntity.ok(msg);
    }

    // Step 2: User enters OTP to verify
    @PostMapping("/user/verify-otp")
    public ResponseEntity<?> userVerifyOtp(@RequestBody OtpVerificationRequest request) {
        String msg = forgotPasswordService.verifyOtp(request, "USER");
        return ResponseEntity.ok(msg);
    }

    // Step 3: User sets new password
    @PostMapping("/user/reset-password")
    public ResponseEntity<?> userResetPassword(@RequestBody PasswordResetRequest request) {
        String msg = forgotPasswordService.resetPassword(request, "USER");
        return ResponseEntity.ok(msg);
    }

    // ======== ADMIN ROUTES ========

    // Step 1: Admin requests OTP to reset password
    @PostMapping("/admin/forgot-password")
    public ResponseEntity<?> adminForgotPassword(@RequestBody ForgotPasswordRequest request) {
        String msg = forgotPasswordService.sendOtp(request, "ADMIN");
        return ResponseEntity.ok(msg);
    }

    // Step 2: Admin enters OTP to verify
    @PostMapping("/admin/verify-otp")
    public ResponseEntity<?> adminVerifyOtp(@RequestBody OtpVerificationRequest request) {
        String msg = forgotPasswordService.verifyOtp(request, "ADMIN");
        return ResponseEntity.ok(msg);
    }

    // Step 3: Admin sets new password
    @PostMapping("/admin/reset-password")
    public ResponseEntity<?> adminResetPassword(@RequestBody PasswordResetRequest request) {
        String msg = forgotPasswordService.resetPassword(request, "ADMIN");
        return ResponseEntity.ok(msg);
    }
}
