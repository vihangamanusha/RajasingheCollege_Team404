package com.rcc.lms.controller;

import com.rcc.lms.dto.LoginRequest;
import com.rcc.lms.dto.LoginResponse;
import com.rcc.lms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    // =========================
    // REGISTER API
    // =========================
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody com.rcc.lms.entity.User user) {
        // This calls the existing method in UserService to create a user
        return ResponseEntity.ok(userService.createUserByAdmin(user));
    }

    // =========================
    // LOGIN API.........
    // =========================
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest request) {

        // call service and return response
        return ResponseEntity.ok(userService.loginUser(request));
    }

    // =========================
    // CHANGE PASSWORD API
    // =========================
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @RequestParam String username,
            @RequestParam String newPassword) {
        try {
            String response = userService.changePassword(username, newPassword);
            if (response.equals("User not found!")) {
                return ResponseEntity.badRequest().body(response);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // =========================
    // TEST API
    // =========================
    @GetMapping("/test")
    public String test() {
        return "API is working!";
    }
}