package com.codora.backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    // This is the email that will appear as "from" in the recipient's inbox
    @Value("${spring.mail.username}")
    private String fromEmail;

    /**
     * Sends a nicely formatted OTP email to the given address.
     */
    public void sendOtpEmail(String toEmail, String otp) throws MessagingException {
        // Build the email content
        String subject = "Codora - Password Reset OTP";
        String body = "<h3>Your Codora OTP is: <strong>" + otp + "</strong></h3>" +
                "<p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>";

        // Create email message object
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        // Set message parameters
        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(body, true); // true enables HTML

        // Finally send the email
        mailSender.send(message);
    }
}
