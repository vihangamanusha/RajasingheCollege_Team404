package com.rcc.lms.controller;

import com.rcc.lms.entity.TeacherAssignment;
import com.rcc.lms.repository.TeacherAssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/assignments")
public class TeacherAssignmentController {

    @Autowired
    private TeacherAssignmentRepository assignmentRepository;

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<TeacherAssignment>> getAssignmentsByTeacher(@PathVariable String teacherId) {
        return ResponseEntity.ok(assignmentRepository.findByTeacherId(teacherId));
    }

    @PostMapping
    public ResponseEntity<TeacherAssignment> createAssignment(@RequestBody TeacherAssignment assignment) {
        if (assignment.getAssignmentId() == null || assignment.getAssignmentId().isEmpty()) {
            assignment.setAssignmentId("ASM-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        assignment.setUploadDate(LocalDate.now());
        TeacherAssignment saved = assignmentRepository.save(assignment);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAssignment(@PathVariable String id) {
        if (assignmentRepository.existsById(id)) {
            assignmentRepository.deleteById(id);
            return ResponseEntity.ok("Assignment deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
