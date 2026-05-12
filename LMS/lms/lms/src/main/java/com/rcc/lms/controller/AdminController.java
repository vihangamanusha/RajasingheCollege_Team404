package com.rcc.lms.controller;

import com.rcc.lms.dto.StudentRegistrationRequest;
import com.rcc.lms.dto.TeacherRegistrationRequest;
import com.rcc.lms.dto.TechRegistrationRequest;
import com.rcc.lms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    // =========================================================
    // SYSTEM HEALTH / TEST
    // =========================================================
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/test")
    public String adminTest() {
        return "Admin Access Granted";
    }

    // =========================================================
    // USER REGISTRATION (WIZARDS)
    // =========================================================

    /**
     * Creates a new student record and their corresponding auth user.
     */
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

    /**
     * Creates a new teacher record and their corresponding auth user.
     */
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

    /**
     * Creates a new technical officer record and their corresponding auth user.
     */
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

    // =========================================================
    // SEARCH & GENERAL UPDATES
    // =========================================================

    /**
     * Search for users based on their role and a search term (ID, Email, or Username).
     */
    @GetMapping("/users/search")
    public ResponseEntity<List<com.rcc.lms.entity.User>> searchUsers(
            @RequestParam String role,
            @RequestParam(required = false) String term) {
        return ResponseEntity.ok(userService.searchUsers(role, term));
    }

    /**
     * Updates general User account data (Email, Status, Role).
     */
    @PutMapping("/users/update/{username}")
    public ResponseEntity<String> updateUser(
            @PathVariable String username,
            @RequestBody com.rcc.lms.entity.User updatedUser) {
        try {
            String response = userService.updateUser(username, updatedUser);
            if (response.equals("User not found!")) {
                return ResponseEntity.badRequest().body(response);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // =========================================================
    // STUDENT PROFILE MANAGEMENT
    // =========================================================

    @GetMapping("/users/student/{username}")
    public ResponseEntity<?> getStudentProfile(@PathVariable String username) {
        try {
            com.rcc.lms.entity.student.Student student = userService.getStudentProfile(username);
            if (student == null) {
                return ResponseEntity.badRequest().body("Student profile not found!");
            }
            return ResponseEntity.ok(student);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/users/student/update/{username}")
    public ResponseEntity<String> updateStudentProfile(
            @PathVariable String username,
            @RequestBody StudentRegistrationRequest request) {
        try {
            String response = userService.updateStudentProfile(username, request);
            if (response.equals("User not found!")) {
                return ResponseEntity.badRequest().body(response);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // =========================================================
    // TEACHER PROFILE MANAGEMENT (FIXES 404/500 Errors)
    // =========================================================

    /**
     * Fetches the full teacher profile including professional details.
     */
    @GetMapping("/users/teacher/{username}")
    public ResponseEntity<?> getTeacherProfile(@PathVariable String username) {
        try {
            com.rcc.lms.entity.Teacher teacher = userService.getTeacherProfile(username);
            if (teacher == null) {
                return ResponseEntity.badRequest().body("Teacher profile not found!");
            }
            return ResponseEntity.ok(teacher);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    /**
     * Updates teacher professional details and auth data.
     */
    @PutMapping("/users/teacher/update/{username}")
    public ResponseEntity<String> updateTeacherProfile(
            @PathVariable String username,
            @RequestBody TeacherRegistrationRequest request) {
        try {
            String response = userService.updateTeacherProfile(username, request);
            if (response.equals("User not found!")) {
                return ResponseEntity.badRequest().body(response);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // =========================================================
    // TECHNICAL OFFICER PROFILE MANAGEMENT (FIXES 404/500 Errors)
    // =========================================================

    /**
     * Fetches the full technical officer profile.
     */
    @GetMapping("/users/tech/{username}")
    public ResponseEntity<?> getTechOfficerProfile(@PathVariable String username) {
        try {
            com.rcc.lms.entity.TechnicalOfficer tech = userService.getTechOfficerProfile(username);
            if (tech == null) {
                return ResponseEntity.badRequest().body("Technical Officer profile not found!");
            }
            return ResponseEntity.ok(tech);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    /**
     * Updates technical officer details and auth data.
     */
    @PutMapping("/users/tech/update/{username}")
    public ResponseEntity<String> updateTechOfficerProfile(
            @PathVariable String username,
            @RequestBody TechRegistrationRequest request) {
        try {
            String response = userService.updateTechOfficerProfile(username, request);
            if (response.equals("User not found!")) {
                return ResponseEntity.badRequest().body(response);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // =========================================================
    // PERMANENT ACCOUNT DELETION
    // =========================================================

    /**
     * Removes the user and their specific profile (Student/Teacher/Tech) permanently.
     */
    @DeleteMapping("/users/delete/{username}")
    public ResponseEntity<String> deleteUserPermanently(@PathVariable String username) {
        try {
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