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

        // Step 1: Hash the password before saving to database
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Step 2: Save user to MongoDB
        User savedUser = userRepository.save(user);

        // Step 3: Hide password from API response (security best practice)
        savedUser.setPassword(null);

        // Step 4: Prepare response
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("user", savedUser);

        return response;
    }
}