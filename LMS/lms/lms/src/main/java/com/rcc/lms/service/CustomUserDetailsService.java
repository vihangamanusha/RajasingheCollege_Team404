package com.rcc.lms.service;

import com.rcc.lms.entity.User;
import com.rcc.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        // =========================
        // 1. FIND USER IN DATABASE
        // =========================
        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found: " + username)
                );

        // =========================
        // 2. HANDLE ROLE SAFELY
        // =========================
        String role = user.getRole();

        if (role == null || role.isEmpty()) {
            role = "USER";
        }

        // IMPORTANT:
        // Spring Security requires "ROLE_ADMIN", "ROLE_TEACHER"
        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }

        // =========================
        // 3. BUILD USER DETAILS
        // =========================
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority(role))
        );
    }
}