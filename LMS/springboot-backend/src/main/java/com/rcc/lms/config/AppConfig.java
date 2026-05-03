package com.rcc.lms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Application-level configuration class.
 * Used to define shared beans for the whole project.
 */
@Configuration
public class AppConfig {

    /**
     * PasswordEncoder bean
     * Used to hash passwords before saving them into the database.
     *
     * BCrypt is a strong hashing algorithm used in real-world applications.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}