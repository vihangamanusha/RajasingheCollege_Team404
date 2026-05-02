package com.rcc.lms.roles.to;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Technical Officer (TO) role controller — equivalent to roles/TO/ (empty in Node.js).
 * Placeholder ready to be expanded.
 */
@RestController
@RequestMapping("/to")
public class ToController {

    // GET /to
    @GetMapping
    public String toDashboard() {
        return "Technical Officer dashboard";
    }
}
