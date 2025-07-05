package com.codora.backend.service;

import com.codora.backend.dto.UserProfileUpdateRequest;
import com.codora.backend.model.User;
import com.codora.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Updates user profile details.
     * - Checks if new username already exists (except for the current user).
     * - Encrypts password if it's being changed.
     */
    public String updateUserProfile(String emailOrUsername, UserProfileUpdateRequest request) {
        // First find the user based on email or username (whichever frontend is sending)
        User user = userRepository.findByEmail(emailOrUsername)
                .or(() -> userRepository.findByUsername(emailOrUsername))
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if the new username is already taken by someone else
        if (request.getUsername() != null &&
                !request.getUsername().equals(user.getUsername()) &&
                userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("This username is already taken. Please choose another one.");
        }

        // Apply updates to user object
        if (request.getUsername() != null) user.setUsername(request.getUsername());
        if (request.getFirstName() != null) user.setFirstName(request.getFirstName());
        if (request.getLastName() != null) user.setLastName(request.getLastName());
        if (request.getNewPassword() != null) user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // Save updated user
        userRepository.save(user);
        return "Profile updated successfully!";
    }
}
