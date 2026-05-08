package com.rcc.lms.controller;


import com.rcc.lms.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5176")
public class StudentController {

    @Autowired
    private StudentService service;

    // CREATE
    @PostMapping
    public com.rcc.lms.student.Student register(@RequestBody com.rcc.lms.student.Student student) {
        return service.register(student);
    }

    // READ ALL
    @GetMapping
    public List<com.rcc.lms.student.Student> getAll() {
        return service.getAllStudents();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public com.rcc.lms.student.Student getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}