package com.rcc.lms.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/technical")
public class TechnicalController {

    @PreAuthorize("hasRole('TECHNICAL_OFFICER')")
    @GetMapping("/test")
    public String techTest() {
        return " Technical Officer Access Granted";
    }
}