package com.rcc.lms.controller;

import com.rcc.lms.entity.User;
import com.rcc.lms.repository.UserRepository;
import com.rcc.lms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/users")
public class AdminUserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    // =========================================================
    // CREATE USER (ADMIN ONLY) - GENERIC
    // Changed path to "/create-generic" to prevent conflict
    // with the new 2-Step Student Registration Wizard!
    // =========================================================
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create-generic")
    public String createUser(@RequestBody User user) {
        return userService.createUserByAdmin(user);
    }

    // =========================
    // GET ALL USERS (ADMIN ONLY)
    // =========================
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // =========================
    // UPDATE USER (ADMIN ONLY)
    // =========================
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{username}")
    public String updateUser(@PathVariable String username,
                             @RequestBody User user) {
        return userService.updateUser(username, user);
    }

    // =========================
    // DELETE USER (ADMIN ONLY)
    // =========================
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete-hard/{username}")
    public String deleteUser(@PathVariable String username) {
        return userService.deleteUser(username);
    }
}