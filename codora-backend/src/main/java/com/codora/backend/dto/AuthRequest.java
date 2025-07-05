package com.codora.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {
    private String identifier;  // Can be username or email
    private String password;

    public AuthRequest(String identifier, String password) {
        this.identifier = identifier;
        this.password = password;
        System.out.println("user" + identifier + " " + password);
    }
}

