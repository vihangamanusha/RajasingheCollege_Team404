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
    // LOGIN API
    // =========================
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest request) {

        // call service and return response
        return ResponseEntity.ok(userService.loginUser(request));
    }

    // =========================
    // TEST API
    // =========================
    @GetMapping("/test")
    public String test() {
        return "API is working!";
    }
}