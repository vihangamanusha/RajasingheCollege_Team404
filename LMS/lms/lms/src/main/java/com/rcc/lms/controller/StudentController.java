package com.rcc.lms.controller;

import com.rcc.lms.entity.student.*;
import com.rcc.lms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private MarksRepository marksRepo;

    @Autowired
    private ReportRepository reportRepo;

    @Autowired
    private DocumentRepository documentRepo;

    // 🔹 Get student profile
    @GetMapping("/{id}")
    public Student getStudent(@PathVariable String id) {
        return studentRepo.findById(id).orElse(null);
    }

    // 🔹 Get marks
    @GetMapping("/{id}/marks")
    public List<Marks> getMarks(@PathVariable String id) {
        return marksRepo.findByStudent_StudentId(id);
    }

    // 🔹 Get report
    @GetMapping("/{id}/report")
    public List<Report> getReport(@PathVariable String id) {
        return reportRepo.findByStudent_StudentId(id);
    }

    // 🔹 Get documents
    @GetMapping("/documents")
    public List<Document> getDocuments() {
        return documentRepo.findAll();
    }
}