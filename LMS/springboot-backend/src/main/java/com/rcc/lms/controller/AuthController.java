package com.rcc.lms.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * AUTH CONTROLLER
 * This handles login and registration APIs
 */

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    /**
     * TEST REGISTER API (no database yet)
     * We will connect MongoDB later
     */
    @PostMapping("/register")
    public Map<String, String> register(@RequestBody Map<String, String> user) {

        String username = user.get("username");
        String password = user.get("password");
        String role = user.get("role");

        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("username", username);
        response.put("role", role);

        return response;
    }
}