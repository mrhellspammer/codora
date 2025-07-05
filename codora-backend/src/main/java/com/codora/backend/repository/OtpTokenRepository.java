package com.codora.backend.repository;

import com.codora.backend.model.OtpToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpTokenRepository extends JpaRepository<OtpToken, Long> {

    Optional<OtpToken> findByEmailAndRole(String email, String role);

    void deleteByEmailAndRole(String email, String role);
}
