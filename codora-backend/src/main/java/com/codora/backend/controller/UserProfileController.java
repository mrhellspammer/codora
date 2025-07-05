package com.codora.backend.controller;

import com.codora.backend.dto.UserProfileUpdateRequest;
import com.codora.backend.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService profileService;

    /**
     * Update user profile fields like username, first name, last name, and password.
     * Frontend should send current email or username in the query param.
     */
    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestParam String emailOrUsername,
                                           @RequestBody UserProfileUpdateRequest request) {
        String msg = profileService.updateUserProfile(emailOrUsername, request);
        return ResponseEntity.ok(msg);
    }
}
