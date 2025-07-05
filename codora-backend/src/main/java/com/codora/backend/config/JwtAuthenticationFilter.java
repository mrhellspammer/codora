package com.codora.backend.config;

import com.codora.backend.model.Admin;
import com.codora.backend.model.User;
import com.codora.backend.repository.AdminRepository;
import com.codora.backend.repository.UserRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;

    private static final List<String> EXCLUDED_URLS = Arrays.asList(
            "/auth/admin/login",
            "/auth/admin/signup",
            "/auth/user/login",
            "/auth/user/signup",
            "/auth/forgot-password",
            "/auth/reset-password",
            "/otp/",
            "/uploads/"
//            "/courses/all"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();

        // Skip JWT validation for excluded paths
        if (EXCLUDED_URLS.stream().anyMatch(path::startsWith)) {
            System.out.println("JWT Filter - Path: " + request.getServletPath());
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authHeader.substring(7);
        Claims claims = jwtUtil.extractAllClaims(token);
        String username = claims.getSubject();
        String role = claims.get("role", String.class);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(role));

            if ("ROLE_ADMIN".equals(role)) {
                adminRepository.findByUsername(username).ifPresent(admin -> {
                    if (jwtUtil.validateToken(token, admin.getUsername())) {
                        UsernamePasswordAuthenticationToken authToken =
                                new UsernamePasswordAuthenticationToken(admin, null, authorities);
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                });
            } else if ("ROLE_USER".equals(role)) {
                userRepository.findByUsername(username).ifPresent(user -> {
                    if (jwtUtil.validateToken(token, user.getUsername())) {
                        UsernamePasswordAuthenticationToken authToken =
                                new UsernamePasswordAuthenticationToken(user, null, authorities);
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                });
            }
        }

        filterChain.doFilter(request, response);
    }
}
