package com.rcc.lms.roles.admin;

import com.rcc.lms.model.User;
import com.rcc.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Admin Controller
 * Handles admin-only operations like creating users
 */

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Admin creates a new user (Student / Teacher / Tech Officer)
     */
    @PostMapping("/create-user")
    public Map<String, Object> createUser(@RequestBody User user) {

        // Validate input
        if (user.getUsername() == null || user.getPassword() == null) {
            throw new RuntimeException("Username and password required");
        }

        // Hash password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save user
        User savedUser = userRepository.save(user);

        // Hide password in response
        savedUser.setPassword(null);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User created successfully by admin");
        response.put("user", savedUser);

        return response;
    }
}