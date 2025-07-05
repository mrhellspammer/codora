package com.codora.backend.service;

import com.codora.backend.dto.AuthRequest;
import com.codora.backend.dto.AuthResponse;
import com.codora.backend.dto.SignupRequest;
import com.codora.backend.model.Admin;
import com.codora.backend.model.Role;
import com.codora.backend.model.User;
import com.codora.backend.repository.AdminRepository;
import com.codora.backend.repository.UserRepository;
import com.codora.backend.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    /**
     * Handles user registration
     */
    public AuthResponse registerUser(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists.");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken.");
        }

        User user = User.builder()
                .username(request.getUsername())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_USER) // Assign user role
                .build();

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());

        return new AuthResponse(token, user.getRole().name(), user.getUsername());
    }

    /**
     * Handles admin registration
     */
    public AuthResponse registerAdmin(SignupRequest request) {
        if (adminRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists.");
        }
        if (adminRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken.");
        }

        Admin admin = Admin.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_ADMIN) // Assign admin role
                .build();

        adminRepository.save(admin);

        String token = jwtUtil.generateToken(admin.getUsername(), admin.getRole().name());

        return new AuthResponse(token, admin.getRole().name(), admin.getUsername());
    }

    /**
     * Handles login for user or admin
     */
    public AuthResponse login(AuthRequest request, boolean isAdmin) {
        if (isAdmin) {
            Admin admin = adminRepository.findByEmailOrUsername(request.getIdentifier(), request.getIdentifier())
                    .orElseThrow(() -> new RuntimeException("Invalid admin credentials"));

            if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
                throw new RuntimeException("Invalid password");
            }

            String token = jwtUtil.generateToken(admin.getUsername(), admin.getRole().name());
            return new AuthResponse(token, admin.getRole().name(), admin.getUsername());

        } else {
            User user = userRepository.findByEmailOrUsername(request.getIdentifier(), request.getIdentifier())
                    .orElseThrow(() -> new RuntimeException("Invalid user credentials"));

            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new RuntimeException("Invalid password");
            }

            String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
            return new AuthResponse(token, user.getRole().name(), user.getUsername());
        }
    }
}
