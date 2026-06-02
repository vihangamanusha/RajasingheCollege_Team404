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

    // UPDATE
    @PutMapping("/{id}")
    public com.rcc.lms.student.Student updateStudent(
            @PathVariable Long id,
            @RequestBody com.rcc.lms.student.Student student) {

        com.rcc.lms.student.Student existing = service.getById(id);

        existing.setFullName(student.getFullName());
        existing.setStudentId(student.getStudentId());
        existing.setPassword(student.getPassword());
        existing.setStudentClass(student.getStudentClass());
        existing.setGrade(student.getGrade());
        existing.setDob(student.getDob());
        existing.setMedium(student.getMedium());
        existing.setAddress(student.getAddress());
        existing.setDonation(student.getDonation());
        existing.setEmergency_contact_name_01(student.getEmergency_contact_name_01());
        existing.setEmergency_contact_name_02(student.getEmergency_contact_name_02());
        existing.se

        return service.save(existing);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        service.delete(id);
    }
}