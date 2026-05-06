package com.rcc.lms.service;

import com.rcc.lms.dto.LoginRequest;
import com.rcc.lms.dto.LoginResponse;
import com.rcc.lms.entity.User;
import com.rcc.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.rcc.lms.security.JwtUtil;

import java.time.LocalDate;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ========================
    // REGISTER USER (SECURE)
    // ========================
    public String registerUser(User user) {

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "Username already exists!";
        }

        // encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setCreatedDate(LocalDate.now());
        user.setStatus("ACTIVE");

        userRepository.save(user);

        return "User registered successfully!";
    }

    // ========================
    // LOGIN USER (FIXED)
    // ========================
    public LoginResponse loginUser(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElse(null);

        if (user == null) {
            return new LoginResponse("User not found!", null, null, null);
        }

        // check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new LoginResponse("Invalid password!", null, null,null);
        }

        // success response
        String token = jwtUtil.generateToken(user.getUsername());

        return new LoginResponse(
                "Login successful",
                user.getUsername(),
                user.getRole(),
                token
        );
    }
}