package com.codora.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "otp_tokens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OtpToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Email to which the OTP was sent
    @Column(nullable = false)
    private String email;

    // 6-digit OTP
    @Column(nullable = false)
    private String otp;

    // Expiry timestamp
    @Column(nullable = false)
    private LocalDateTime expiresAt;

    // "USER" or "ADMIN"
    @Column(nullable = false)
    private String role;
}
