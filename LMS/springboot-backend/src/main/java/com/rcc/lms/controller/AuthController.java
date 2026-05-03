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
 * Handles user registration (and later login)
 * Connected with MongoDB
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Register a new user (Admin / Student / Teacher etc.)
     * URL: POST /api/auth/register
     */
    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody User user) {

        // Validate password
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new RuntimeException("Password cannot be empty");
        }

        // Force ADMIN role (temporary for testing)
        user.setRole("ADMIN");

        // Hash password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save user
        User savedUser = userRepository.save(user);

        // Hide password in response
        savedUser.setPassword(null);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("user", savedUser);

        return response;
    }
}