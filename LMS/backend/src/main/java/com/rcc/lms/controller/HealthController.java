package com.rcc.lms.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/")
    public String home() {
        return "✅ Rajasinghe College LMS Backend is running on port 5001!";
    }

    @GetMapping("/api/health")
    public String health() {
        return "✅ API is healthy!";
    }
}
