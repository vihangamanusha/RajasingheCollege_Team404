package com.rcc.lms.controller;

import com.rcc.lms.entity.student.Student;
import com.rcc.lms.entity.student.Subject;
import com.rcc.lms.repository.StudentSubRepository;
import com.rcc.lms.repository.StudentSubjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "*")
public class StudentSubjectController {

    @Autowired
    private StudentSubRepository studentRepository;

    @Autowired
    private StudentSubjectRepository subjectRepository;

    @GetMapping("/{studentId}/subjects")
    public List<Subject> getStudentSubjects(@PathVariable String studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // NULL check
        if (student.getClassEntity() == null) {
            throw new RuntimeException("Student class not assigned");
        }

        String classId = student.getClassEntity().getClassId();

        return subjectRepository.findByClassId(classId);
    }
}