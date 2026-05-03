package com.rcc.lms.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Simple test controller to check if backend is running.
 * Equivalent to a basic root route in Node.js.
 */

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Rajasinghe College LMS Backend is running";
    }
}