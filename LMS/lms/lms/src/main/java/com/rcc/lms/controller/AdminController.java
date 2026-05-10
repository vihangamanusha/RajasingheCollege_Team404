package com.rcc.lms.controller;

import com.rcc.lms.dto.StudentRegistrationRequest;
import com.rcc.lms.dto.TeacherRegistrationRequest; // IMPORT
import com.rcc.lms.dto.TechRegistrationRequest; // IMPORT
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

    // =========================================================
    // CREATE STUDENT API
    // React calls: POST /admin/users/create
    // =========================================================
    @PostMapping("/users/create")
    public ResponseEntity<String> createStudent(@RequestBody StudentRegistrationRequest request) {
        try {
            String response = userService.registerNewStudent(request);
            if (response.equals("Username already exists!")) {
                return ResponseEntity.badRequest().body(response);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // =========================================================
    // NEW: CREATE TEACHER API
    // React calls: POST /admin/users/teacher/create
    // =========================================================
    @PostMapping("/users/teacher/create")
    public ResponseEntity<String> createTeacher(@RequestBody TeacherRegistrationRequest request) {
        try {
            String response = userService.registerNewTeacher(request);
            if (response.equals("Username already exists!")) {
                return ResponseEntity.badRequest().body(response);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // =========================================================
    // NEW: CREATE TECH OFFICER API
    // React calls: POST /admin/users/tech/create
    // =========================================================
    @PostMapping("/users/tech/create")
    public ResponseEntity<String> createTechOfficer(@RequestBody TechRegistrationRequest request) {
        try {
            String response = userService.registerNewTechOfficer(request);
            if (response.equals("Username already exists!")) {
                return ResponseEntity.badRequest().body(response);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}