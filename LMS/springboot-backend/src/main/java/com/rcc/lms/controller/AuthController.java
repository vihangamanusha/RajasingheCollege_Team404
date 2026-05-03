package com.rcc.lms.controller;

import com.rcc.lms.model.User;
import com.rcc.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Authentication Controller
 * Handles:
 * - User registration
 * - (Next step: login with JWT)
 *
 * IMPORTANT:
 * In this LMS system, ONLY ADMIN will later be allowed to create users.
 * For now, we allow open registration for testing.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * REGISTER USER
     * Endpoint: POST /api/auth/register
     */
    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody User user) {

        // -------------------------------
        // 1. Validate username
        // -------------------------------
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            throw new RuntimeException("Username cannot be empty");
        }

        // -------------------------------
        // 2. Validate password
        // -------------------------------
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new RuntimeException("Password cannot be empty");
        }

        // -------------------------------
        // 3. IMPORTANT FIX:
        // DO NOT force ADMIN role
        // Role must come from request body
        // -------------------------------
        if (user.getRole() == null) {
            throw new RuntimeException("Role cannot be empty");
        }

        // -------------------------------
        // 4. Hash password before saving
        // -------------------------------
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // -------------------------------
        // 5. Save user to MongoDB
        // -------------------------------
        User savedUser = userRepository.save(user);

        // -------------------------------
        // 6. Hide password from response
        // -------------------------------
        savedUser.setPassword(null);

        // -------------------------------
        // 7. Response
        // -------------------------------
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("user", savedUser);

        return response;
    }
}