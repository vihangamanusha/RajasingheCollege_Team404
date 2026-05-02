package com.rcc.lms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the Rajasinghe College LMS Spring Boot application.
 * Equivalent to index.js in the Node.js backend.
 */
@SpringBootApplication
public class LmsApplication {

    public static void main(String[] args) {
        SpringApplication.run(LmsApplication.class, args);
        System.out.println("Rajasinghe College LMS Backend is running on http://localhost:5001");
    }
}
