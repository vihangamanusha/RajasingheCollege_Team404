
package com.rcc.lms.service;

import com.rcc.lms.entity.User;
import com.rcc.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.rcc.lms.dto.LoginRequest;
import com.rcc.lms.dto.LoginResponse;
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

    // =========================
    // LOGIN USER
    // =========================
    public LoginResponse loginUser(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElse(null);

        if (user == null) {
            throw new RuntimeException("Invalid username or password");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        String token = jwtUtil.generateToken(user.getUsername());

        return new LoginResponse(
                "Login successful",
                user.getUsername(),
                user.getRole(),
                token
        );
    }

    // =========================
    // ADMIN - CREATE USER
    // =========================
    public String createUserByAdmin(User user) {

        // check duplicate username
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "Username already exists!";
        }

        // encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // set default values
        user.setCreatedDate(LocalDate.now());
        user.setStatus("ACTIVE");

        userRepository.save(user);

        return "User created successfully by admin!";
    }

    // =========================
    // ADMIN - UPDATE USER
    // =========================
    public String updateUser(String username, User updatedUser) {

        User existingUser = userRepository.findByUsername(username)
                .orElse(null);

        if (existingUser == null) {
            return "User not found!";
        }

        if (updatedUser.getRole() != null)
            existingUser.setRole(updatedUser.getRole());

        if (updatedUser.getSubRole() != null)
            existingUser.setSubRole(updatedUser.getSubRole());

        if (updatedUser.getEmail() != null)
            existingUser.setEmail(updatedUser.getEmail());

        if (updatedUser.getStatus() != null)
            existingUser.setStatus(updatedUser.getStatus());

        userRepository.save(existingUser);

        return "User updated successfully!";
    }

    // =========================
    // ADMIN - DELETE USER
    // =========================
    public String deleteUser(String username) {

        User user = userRepository.findByUsername(username)
                .orElse(null);

        if (user == null) {
            return "User not found!";
        }

        userRepository.delete(user);

        return "User deleted successfully!";
    }
}