package com.rcc.lms.controller;

import com.rcc.lms.model.User;
import com.rcc.lms.repository.UserRepository;
import com.rcc.lms.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * AUTH CONTROLLER
 *
 * Handles:
 * 1. User Registration (Admin creates users later)
 * 2. User Login (JWT token generation)
 *
 * This is the main authentication system of LMS.
 */

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * REGISTER USER
     * Used by Admin (later) to create:
     * - ADMIN
     * - STUDENT
     * - TEACHER
     * - TECHNICAL OFFICER
     */
    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody User user) {

        // Validate username
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new RuntimeException("Username cannot be empty");
        }

        // Validate password
        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password cannot be empty");
        }

        // FIX: Role is ENUM → only null check is allowed
        if (user.getRole() == null) {
            throw new RuntimeException("Role cannot be empty");
        }

        // Hash password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save user
        User savedUser = userRepository.save(user);

        // Hide password
        savedUser.setPassword(null);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("user", savedUser);

        return response;
    }

    /**
     * LOGIN USER
     * Step:
     * 1. Find user by username
     * 2. Compare password (BCrypt)
     * 3. Generate JWT token
     */
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {

        // 1. Find user
        User dbUser = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Check password
        if (!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // 3. Generate JWT token
        String token = jwtUtil.generateToken(dbUser.getUsername());

        // 4. Response
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("token", token);
        response.put("username", dbUser.getUsername());
        response.put("role", dbUser.getRole());

        return response;
    }
}