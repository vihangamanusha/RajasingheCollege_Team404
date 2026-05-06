package com.rcc.lms.controller;

import com.rcc.lms.dto.LoginRequest;
import com.rcc.lms.entity.User;
import com.rcc.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserTestController {

    @Autowired
    private UserRepository userRepository;

    // ================= ADD USER =================
    @PostMapping("/add")
    public String addUser(@RequestBody User user) {

        user.setCreatedDate(LocalDate.now());
        user.setStatus("ACTIVE");

        userRepository.save(user);

        return "User registered successfully!";
    }

    // ================= LOGIN USER =================
    @PostMapping("/login")
    public String loginUser(@RequestBody LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElse(null);

        if (user == null) {
            return "User not found!";
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return "Invalid password!";
        }

        return "Login successful! Role: " + user.getRole();
    }
}