package com.rcc.lms.controller;

import com.rcc.lms.dto.StudentRegistrationRequest;
import com.rcc.lms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    // =========================
    // EXISTING TEST ENDPOINT
    // =========================
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/test")
    public String adminTest() {
        return "Admin Access Granted";
    }

    // =========================
    // NEW: CREATE STUDENT API
    // React calls: POST /admin/users/create
    // =========================
    @PostMapping("/users/create")
    public ResponseEntity<String> createStudent(@RequestBody StudentRegistrationRequest request) {
        try {
            // Send the React data to the UserService to save to the database
            String response = userService.registerNewStudent(request);

            if (response.equals("Username already exists!")) {
                return ResponseEntity.badRequest().body(response);
            }

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}