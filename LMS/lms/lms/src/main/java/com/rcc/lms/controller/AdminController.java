package com.rcc.lms.controller;

import com.rcc.lms.dto.StudentRegistrationRequest;
import com.rcc.lms.dto.TeacherRegistrationRequest;
import com.rcc.lms.dto.TechRegistrationRequest;
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

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/test")
    public String adminTest() {
        return "Admin Access Granted";
    }

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

    @GetMapping("/users/search")
    public ResponseEntity<java.util.List<com.rcc.lms.entity.User>> searchUsers(
            @RequestParam String role,
            @RequestParam(required = false) String term) {

        return ResponseEntity.ok(userService.searchUsers(role, term));
    }

    // =========================================================
    // PERMANENT DELETE USER API
    // React calls: DELETE /admin/users/delete/Nimal123
    // =========================================================
    @DeleteMapping("/users/delete/{username}")
    public ResponseEntity<String> deleteUserPermanently(@PathVariable String username) {
        try {
            // Call our new smart hard-delete method!
            String response = userService.hardDeleteUser(username);

            if (response.equals("User not found!")) {
                return ResponseEntity.badRequest().body(response);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}