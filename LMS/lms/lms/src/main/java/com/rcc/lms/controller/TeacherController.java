package com.rcc.lms.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teacher")
public class TeacherController {

    @PreAuthorize("hasRole('TEACHER')")
    @GetMapping("/test")
    public String teacherTest() {
        return " Teacher Access Granted";
    }
}