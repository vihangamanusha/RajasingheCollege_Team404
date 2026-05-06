package com.rcc.lms.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
public class StudentController {

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/test")
    public String studentTest() {
        return " Student Access Granted";
    }
}