package com.rcc.lms.service;

import com.rcc.lms.dto.LoginRequest;
import com.rcc.lms.dto.LoginResponse;
import com.rcc.lms.entity.User;
import com.rcc.lms.repository.UserRepository;
import com.rcc.lms.security.JwtUtil;
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

    @Autowired
    private JwtUtil jwtUtil;

    // ========================
    // REGISTER USER (PUBLIC)
    // ========================
    public String registerUser(User user) {

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "Username already exists!";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedDate(LocalDate.now());
        user.setStatus("ACTIVE");

        userRepository.save(user);

        return "User registered successfully!";
    }

    // ========================
    // LOGIN USER (JWT)
    // ========================
    public LoginResponse loginUser(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElse(null);

        if (user == null) {
            return new LoginResponse("User not found!", null, null, null);
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new LoginResponse("Invalid password!", null, null, null);
        }

        String token = jwtUtil.generateToken(user.getUsername());

        return new LoginResponse(
                "Login successful",
                user.getUsername(),
                user.getRole(),
                token
        );
    }

    // ========================
    // 👑 ADMIN - CREATE USER
    // ========================
    public String createUserByAdmin(User user) {

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "Username already exists!";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedDate(LocalDate.now());
        user.setStatus("ACTIVE");

        userRepository.save(user);

        return "User created by admin successfully!";
    }

    // ========================
    // ✏️ ADMIN - UPDATE USER (NEW)
    // ========================
    public String updateUser(String username, User updatedUser) {

        User existingUser = userRepository.findByUsername(username)
                .orElse(null);

        if (existingUser == null) {
            return "User not found!";
        }

        // update fields
        existingUser.setRole(updatedUser.getRole());
        existingUser.setSubRole(updatedUser.getSubRole());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setStatus(updatedUser.getStatus());

        userRepository.save(existingUser);

        return "User updated successfully!";
    }
}