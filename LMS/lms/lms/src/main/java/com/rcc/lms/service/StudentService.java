package com.rcc.lms.service;


import com.rcc.lms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repo;

    public com.rcc.lms.student.Student register(com.rcc.lms.student.Student student) {

        if (repo.existsByStudentId(student.getStudentId())) {
            throw new RuntimeException("Student ID already exists");
        }

        return repo.save(student);
    }
    public com.rcc.lms.student.Student save(com.rcc.lms.student.Student student) {
        return repo.save(student);
    }
    public List<com.rcc.lms.student.Student> getAllStudents() {
        return repo.findAll();
    }

    public com.rcc.lms.student.Student getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}