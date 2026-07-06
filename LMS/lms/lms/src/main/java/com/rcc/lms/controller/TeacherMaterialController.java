package com.rcc.lms.controller;

import com.rcc.lms.entity.student.StudentDocument;
import com.rcc.lms.repository.StudentDocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/materials")
public class TeacherMaterialController {

    @Autowired
    private StudentDocumentRepository documentRepository;

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<StudentDocument>> getMaterialsByTeacher(@PathVariable String teacherId) {
        return ResponseEntity.ok(documentRepository.findByTeacherId(teacherId));
    }

    @PostMapping
    public ResponseEntity<StudentDocument> createMaterial(@RequestBody StudentDocument doc) {
        if (doc.getDocumentId() == null || doc.getDocumentId().isEmpty()) {
            doc.setDocumentId("DOC-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        doc.setUploadDate(LocalDate.now());
        StudentDocument saved = documentRepository.save(doc);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMaterial(@PathVariable String id) {
        if (documentRepository.existsById(id)) {
            documentRepository.deleteById(id);
            return ResponseEntity.ok("Material deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
