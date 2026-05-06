package com.rcc.lms.service;

import com.rcc.lms.dto.LoginRequest;
import com.rcc.lms.entity.User;
import com.rcc.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ========================
    // REGISTER USER (SECURE)
    // ========================
    public String registerUser(User user) {

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "Username already exists!";
        }

        // 🔐 encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setCreatedDate(LocalDate.now());
        user.setStatus("ACTIVE");

        userRepository.save(user);

        return "User registered successfully!";
    }

    // ========================
    // LOGIN USER (SECURE)
    // ========================
    public String loginUser(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElse(null);

        if (user == null) {
            return "User not found!";
        }

        // 🔐 compare encrypted password properly
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return "Invalid password!";
        }

        return "Login successful! Role: " + user.getRole();
    }
}