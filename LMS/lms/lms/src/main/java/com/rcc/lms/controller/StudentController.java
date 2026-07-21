package com.rcc.lms.controller;

import com.rcc.lms.dto.StudentMarksDTO;
import com.rcc.lms.dto.StudentProfileDTO;
import com.rcc.lms.entity.student.Student;
import com.rcc.lms.entity.student.StudentDocument;
import com.rcc.lms.entity.student.StudentMarks;
import com.rcc.lms.entity.student.StudentReport;
import com.rcc.lms.entity.student.Subject;

import com.rcc.lms.repository.StudentDocumentRepository;
import com.rcc.lms.repository.StudentMarksRepository;
import com.rcc.lms.repository.StudentReportRepository;
import com.rcc.lms.repository.StudentRepository;
import com.rcc.lms.repository.SubjectRepository;
import com.rcc.lms.service.StudentReportPdfService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "*")
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
    private SubjectRepository subjectRepository;

    @Autowired
    private StudentReportPdfService pdfService;

    // =============================================
    // GET /api/student/{id}
    // Returns a flat StudentProfileDTO
    // =============================================
    @GetMapping("/{id}")
    public ResponseEntity<StudentProfileDTO> getStudent(@PathVariable String id) {
        return studentRepository.findById(id)
                .map(this::toProfileDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // =============================================
    // GET /api/student/by-dob
    // Returns list of students by DOB range
    // =============================================
    @GetMapping("/by-dob")
    public java.util.List<Student> getStudentsByDob(
            @RequestParam @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate from,
            @RequestParam @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate to
    ) {
        return studentRepository.findByDateOfBirthBetween(from, to);
    }

    // =============================================
    // GET /api/student/{id}/marks
    // Returns list of StudentMarksDTOs
    // =============================================
    @GetMapping("/{id}/marks")
    public List<StudentMarksDTO> getStudentMarks(@PathVariable String id) {
        List<StudentMarks> marksList = marksRepository.findByStudentStudentId(id);
        return marksList.stream()
                .map(m -> new StudentMarksDTO(
                        m.getMarkId(),
                        m.getSubject() != null ? m.getSubject().getSubjectName() : "Unknown",
                        m.getTerm(),
                        m.getAssignmentMark()
                ))
                .collect(Collectors.toList());
    }

    // =============================================
    // GET /api/student/{id}/report
    // Returns list of StudentReport objects
    // =============================================
    @GetMapping("/{id}/report")
    public List<StudentReport> getStudentReport(@PathVariable String id) {
        return reportRepository.findByStudentStudentId(id);
    }

    // =============================================
    // GET /api/student/{id}/rank
    // Returns dynamic rank of student in class for term
    // =============================================
    @GetMapping("/{id}/rank")
    public ResponseEntity<java.util.Map<String, Object>> getStudentRank(
            @PathVariable String id,
            @RequestParam(required = false, defaultValue = "Term 1") String term) {
        
        java.util.Optional<Student> studentOpt = studentRepository.findById(id);
        if (!studentOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        Student currentStudent = studentOpt.get();
        if (currentStudent.getClassEntity() == null) {
            java.util.Map<String, Object> response = new java.util.HashMap<>();
            response.put("rank", "—");
            return ResponseEntity.ok(response);
        }
        
        String classId = currentStudent.getClassEntity().getClassId();
        java.util.List<Student> classStudents = studentRepository.findByClassEntityClassId(classId);
        
        java.util.Map<String, Double> studentAverages = new java.util.HashMap<>();
        
        for (Student student : classStudents) {
            java.util.List<StudentMarks> marks = marksRepository.findByStudentStudentId(student.getStudentId());
            double sum = 0;
            int count = 0;
            for (StudentMarks m : marks) {
                if (term.equalsIgnoreCase(m.getTerm()) && m.getAssignmentMark() != null) {
                    sum += m.getAssignmentMark();
                    count++;
                }
            }
            double average = count > 0 ? (sum / count) : -1.0;
            studentAverages.put(student.getStudentId(), average);
        }
        
        java.util.List<java.util.Map.Entry<String, Double>> sortedStudents = studentAverages.entrySet().stream()
                .filter(entry -> entry.getValue() >= 0)
                .sorted((e1, e2) -> Double.compare(e2.getValue(), e1.getValue()))
                .collect(Collectors.toList());
                
        int rank = -1;
        for (int i = 0; i < sortedStudents.size(); i++) {
            if (sortedStudents.get(i).getKey().equals(id)) {
                rank = i + 1;
                break;
            }
        }
        
        java.util.Map<String, Object> response = new java.util.HashMap<>();
        if (rank != -1) {
            response.put("rank", rank);
        } else {
            response.put("rank", "—");
        }
        return ResponseEntity.ok(response);
    }

    // =============================================
    // GET /api/student/documents
    // Returns all documents
    // =============================================
    @GetMapping("/documents")
    public List<StudentDocument> getStudentDocuments() {
        return documentRepository.findAll();
    }

    @GetMapping("/documents/class/{classId}")
    public List<StudentDocument> getStudentDocumentsByClass(@PathVariable String classId) {
        return documentRepository.findByClassId(classId);
    }

    // =============================================
    // GET /api/student/{id}/subjects
    // Returns subjects for the student's class
    // =============================================
    @GetMapping("/{id}/subjects")
    public List<Subject> getStudentSubjects(@PathVariable String id) {
        return studentRepository.findById(id)
                .map(student -> {
                    if (student.getClassEntity() != null) {
                        return subjectRepository.findByClassId(student.getClassEntity().getClassId());
                    }
                    return Collections.<Subject>emptyList();
                })
                .orElse(Collections.emptyList());
    }

    // =============================================
    // GET /api/student/subjects/{subjectId}/documents
    // Returns documents for a specific subject
    // =============================================
    @GetMapping("/subjects/{subjectId}/documents")
    public List<StudentDocument> getSubjectDocuments(@PathVariable String subjectId) {
        return documentRepository.findBySubjectId(subjectId);
    }

    // =============================================
    // GET /api/student/{id}/report/pdf
    // Generates and streams a PDF report
    // =============================================
    @GetMapping("/{id}/report/pdf")
    public ResponseEntity<byte[]> downloadReportPdf(@PathVariable String id) {
        Student student = studentRepository.findById(id).orElse(null);
        if (student == null) return ResponseEntity.notFound().build();

        List<StudentMarks> marks = marksRepository.findByStudentStudentId(id);
        List<StudentReport> reports = reportRepository.findByStudentStudentId(id);
        StudentReport report = (reports != null && !reports.isEmpty())
                ? reports.get(reports.size() - 1) : null;

        byte[] pdfBytes = pdfService.generateReportPdf(student, report, marks);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=Report_" + id + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }

    // =============================================
    // Helper: Convert Student entity → ProfileDTO
    // =============================================
    private StudentProfileDTO toProfileDTO(Student s) {
        StudentProfileDTO dto = new StudentProfileDTO();
        dto.setStudentId(s.getStudentId());
        dto.setFullName(s.getFullName());
        dto.setDateOfBirth(s.getDateOfBirth() != null ? s.getDateOfBirth().toString() : null);
        dto.setAddress(s.getAddress());
        dto.setMedium(s.getMedium() != null ? s.getMedium().name() : null);
        dto.setContactNumber(s.getContactNumber());
        dto.setFatherName(s.getFatherName());
        dto.setMotherName(s.getMotherName());
        dto.setFatherContact(s.getFatherContact());
        dto.setMotherContact(s.getMotherContact());
        dto.setEmergencyContact(s.getEmergencyContact());

        if (s.getClassEntity() != null) {
            dto.setClassId(s.getClassEntity().getClassId());
            dto.setClassName(s.getClassEntity().getClassName());
            dto.setClassYear(s.getClassEntity().getYear());
        }

        if (s.getUser() != null) {
            dto.setEmail(s.getUser().getEmail());
            dto.setStatus(s.getUser().getStatus());
        }

        return dto;
    }
}