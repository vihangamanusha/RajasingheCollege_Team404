package com.rcc.lms.controller;


import com.rcc.lms.service.StudentService;
import com.rcc.lms.student.Student;
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
    public Student updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {

        Student existing = service.getById(id);

        existing.setFullName(student.getFullName());
        existing.setStudentId(student.getStudentId());
        existing.setPassword(student.getPassword());
        existing.setGrade(student.getGrade());
        existing.setStudentClass(student.getStudentClass());
        existing.setMedium(student.getMedium());
        existing.setDob(student.getDob());
        existing.setAddress(student.getAddress());

        existing.setGardian_name(student.getGardian_name());
        existing.setGardian_contact(student.getGardian_contact());

        existing.setEmergency_contact_name_01(
                student.getEmergency_contact_name_01());
        existing.setEmergency_contact_name_02(
                student.getEmergency_contact_name_02());

        existing.setEmergency_contact_contact_01(
                student.getEmergency_contact_contact_01());
        existing.setEmergency_contact_contact_02(
                student.getEmergency_contact_contact_02());

        existing.setMother_job(student.getMother_job());
        existing.setFather_job(student.getFather_job());

        existing.setDonation(student.getDonation());

        return service.save(existing);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        service.delete(id);
    }
}