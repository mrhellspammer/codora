package com.codora.backend.controller;

import com.codora.backend.dto.AuthRequest;
import com.codora.backend.dto.AuthResponse;
import com.codora.backend.dto.SignupRequest;
import com.codora.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * User signup endpoint
     */
    @PostMapping("/user/signup")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody SignupRequest request) {
        return ResponseEntity.ok(authService.registerUser(request));
    }

    /**
     * Admin signup endpoint
     */
    @PostMapping("/admin/signup")
    public ResponseEntity<AuthResponse> registerAdmin(@RequestBody SignupRequest request) {
        return ResponseEntity.ok(authService.registerAdmin(request));
    }

    /**
     * User login endpoint
     */
    @PostMapping("/user/login")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody AuthRequest request) {
        System.out.println("User login endpoint hit");
        return ResponseEntity.ok(authService.login(request, false));
    }

    /**
     * Admin login endpoint
     */
    @PostMapping("/admin/login")
    public ResponseEntity<AuthResponse> loginAdmin(@RequestBody AuthRequest request) {
        System.out.println("Admin login endpoint hit");// DEBUG
        return ResponseEntity.ok(authService.login(request, true));
    }
}
