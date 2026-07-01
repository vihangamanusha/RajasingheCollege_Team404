package com.rcc.lms.controller;

import com.rcc.lms.dto.DashboardStatsDTO; // Ensure this DTO exists
import com.rcc.lms.dto.StudentRegistrationRequest;
import com.rcc.lms.dto.TeacherRegistrationRequest;
import com.rcc.lms.dto.TechRegistrationRequest;
import com.rcc.lms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController//handle rest api
@RequestMapping("/admin")//all url strt with the admin
public class AdminController {

    @Autowired//inject the service layer
    private UserService userService;

    // =========================================================
    // NEW: DYNAMIC DASHBOARD DATA
    // =========================================================
    /**
     * Fetches real-time counts and the latest activity logs for the dashboard.
     */
    @GetMapping("/dashboard/stats")
    //retun total stu,teacher,recnet activity
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {//retun dto object
        try {
            // Calls the service method we created to aggregate database counts
            return ResponseEntity.ok(userService.getAdminDashboardStats());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // =========================================================
    // USER REGISTRATION
    // =========================================================
/*
    @PostMapping("/users/create")
    public ResponseEntity<String> createStudent(@RequestBody StudentRegistrationRequest request) {//front send json, Spring converts JSON → Java object.
        try {
            String response = userService.registerNewStudent(request);
            if (response.startsWith("Error") || response.equals("Username already exists!")) {//chck the username
                return ResponseEntity.badRequest().body(response);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
*/
    @PostMapping("/users/teacher/create")
    public ResponseEntity<String> createTeacher(@RequestBody TeacherRegistrationRequest request) {//json to java object
        try {
            String response = userService.registerNewTeacher(request);
            if (response.startsWith("Error") || response.equals("Username already exists!")) {
                return ResponseEntity.badRequest().body(response);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/users/tech/create")
    public ResponseEntity<String> createTechOfficer(@RequestBody TechRegistrationRequest request) {//json to java object
        try {
            String response = userService.registerNewTechOfficer(request);
            if (response.startsWith("Error") || response.equals("Username already exists!")) {
                return ResponseEntity.badRequest().body(response);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // =========================================================
    // SEARCH, UPDATES & PROFILE MANAGEMENT
    // =========================================================

    @GetMapping("/users/search")
    public ResponseEntity<List<com.rcc.lms.entity.User>> searchUsers(
            @RequestParam String role,
            @RequestParam(required = false) String term) {
        return ResponseEntity.ok(userService.searchUsers(role, term));
    }//serch by role and username.retun list<user>

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
/*
    @GetMapping("/users/student/{username}")
    public ResponseEntity<?> getStudentProfile(@PathVariable String username) {
        try {
            com.rcc.lms.entity.student.Student student = userService.getStudentProfile(username);
            if (student == null) {
                return ResponseEntity.badRequest().body("Student profile not found!");
            }
            return ResponseEntity.ok(student);//retun student object
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

    @DeleteMapping("/users/delete/{username}")
    public ResponseEntity<String> deleteUserSoftly(
            @PathVariable String username,
            @RequestParam(required = false, defaultValue = "No reason provided") String reason) {
        try {
            String response = userService.softDeleteUser(username, reason);
            if (response.equals("User not found!")) {
                return ResponseEntity.badRequest().body(response);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/users/generate-id")
    public ResponseEntity<String> generateNextId(@RequestParam String role) {
        try {
            String nextId = userService.generateNextUserId(role);
            return ResponseEntity.ok(nextId);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/users/occupied-designations")
    public ResponseEntity<java.util.List<String>> getOccupiedDesignations() {
        try {
            return ResponseEntity.ok(userService.getOccupiedDesignations());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}