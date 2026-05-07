package com.rcc.lms.controller;

import com.rcc.lms.entity.student.Student;
import com.rcc.lms.entity.student.StudentDocument;
import com.rcc.lms.entity.student.StudentMarks;
import com.rcc.lms.entity.student.StudentReport;
import com.rcc.lms.repository.StudentDocumentRepository;
import com.rcc.lms.repository.StudentMarksRepository;
import com.rcc.lms.repository.StudentReportRepository;
import com.rcc.lms.repository.StudentRepository;
import com.rcc.lms.service.StudentReportPdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentMarksRepository marksRepository;

    @Autowired
    private StudentReportRepository reportRepository;

    @Autowired
    private StudentDocumentRepository documentRepository;

    @Autowired
    private StudentReportPdfService pdfService;

    @GetMapping("/{id}/report/pdf")
    public ResponseEntity<byte[]> downloadReportPdf(@PathVariable String id) {
        Student student = studentRepository.findById(id).orElse(null);
        if (student == null) return ResponseEntity.notFound().build();

        List<StudentMarks> marks = marksRepository.findByStudentStudentId(id);
        List<StudentReport> reports = reportRepository.findByStudentStudentId(id);
        StudentReport report = (reports != null && !reports.isEmpty()) ? reports.get(reports.size() - 1) : null;

        byte[] pdfBytes = pdfService.generateReportPdf(student, report, marks);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=Report_" + id + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable String id) {
        return studentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/marks")
    public List<StudentMarks> getStudentMarks(@PathVariable String id) {
        return marksRepository.findByStudentStudentId(id);
    }

    @GetMapping("/{id}/report")
    public List<StudentReport> getStudentReport(@PathVariable String id) {
        return reportRepository.findByStudentStudentId(id);
    }

    @GetMapping("/documents")
    public List<StudentDocument> getStudentDocuments() {
        return documentRepository.findAll();
    }
}