package com.codora.backend.dto;

import lombok.Getter;
import lombok.Setter;

// This DTO is used when a user updates their profile details
@Getter
@Setter
public class UserProfileUpdateRequest {

    // New username (must be unique)
    private String username;

    // Optional name changes
    private String firstName;
    private String lastName;

    // Optional new password (if user wants to change it)
    private String newPassword;
}
