package com.rcc.lms.controller;

import com.rcc.lms.dto.CreateClassRequest;
import com.rcc.lms.service.ClassManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/classes")
@CrossOrigin
public class ClassManagementController {

    @Autowired
    private ClassManagementService classManagementService;

    // ─────────────────────────────────────────
    // GET all classes
    // ─────────────────────────────────────────
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllClasses(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dobFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dobTo
    ) {
        if (dobFrom != null && dobTo != null) {
            return ResponseEntity.ok(classManagementService.getClassesForBatch(dobFrom, dobTo));
        }
        // Return all classes with student counts
        List<com.rcc.lms.entity.student.ClassEntity> all = classManagementService.getAllClasses();
        List<Map<String, Object>> result = new java.util.ArrayList<>();
        for (var c : all) {
            Map<String, Object> m = new java.util.HashMap<>();
            m.put("classId", c.getClassId());
            m.put("className", c.getClassName());
            m.put("grade", c.getGrade());
            m.put("year", c.getYear());
            m.put("assignmentOpen", c.isAssignmentOpen());
            m.put("devEnabled", c.isDevEnabled());
            m.put("secEnabled", c.isSecEnabled());
            m.put("dobFrom", c.getDobFrom() != null ? c.getDobFrom().toString() : null);
            m.put("dobTo", c.getDobTo() != null ? c.getDobTo().toString() : null);
            m.put("teacherName", c.getTeacher() != null ? c.getTeacher().getFullName() : null);
            m.put("teacherId", c.getTeacher() != null ? c.getTeacher().getTeacherId() : null);
            m.put("studentCount", classManagementService.getClassRoster(c.getClassId()).size());
            result.add(m);
        }
        return ResponseEntity.ok(result);
    }

    // ─────────────────────────────────────────
    // GET student pool (DOB range, unassigned)
    // ─────────────────────────────────────────
    @GetMapping("/pool")
    public ResponseEntity<List<Map<String, Object>>> getPool(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dobFrom,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dobTo
    ) {
        return ResponseEntity.ok(classManagementService.getStudentPool(dobFrom, dobTo));
    }

    // ─────────────────────────────────────────
    // GET class roster (students in a class)
    // ─────────────────────────────────────────
    @GetMapping("/{classId}/students")
    public ResponseEntity<List<Map<String, Object>>> getClassRoster(@PathVariable String classId) {
        return ResponseEntity.ok(classManagementService.getClassRoster(classId));
    }

    // ─────────────────────────────────────────
    // POST create a new empty class
    // ─────────────────────────────────────────
    @PostMapping("/create")
    public ResponseEntity<?> createClass(@RequestBody CreateClassRequest request) {
        try {
            Map<String, Object> created = classManagementService.createClass(request);
            return ResponseEntity.ok(created);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────
    // PUT assign student to a class
    // ─────────────────────────────────────────
    @PutMapping("/{classId}/assign/{studentId}")
    public ResponseEntity<Map<String, String>> assignStudent(
            @PathVariable String classId,
            @PathVariable String studentId
    ) {
        try {
            String msg = classManagementService.assignStudent(classId, studentId);
            return ResponseEntity.ok(Map.of("message", msg));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────
    // DELETE remove student from class (back to pool)
    // ─────────────────────────────────────────
    @DeleteMapping("/{classId}/remove/{studentId}")
    public ResponseEntity<Map<String, String>> removeStudent(
            @PathVariable String classId,
            @PathVariable String studentId
    ) {
        try {
            String msg = classManagementService.removeStudent(classId, studentId);
            return ResponseEntity.ok(Map.of("message", msg));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────
    // PUT toggle teacher edit permission
    // ─────────────────────────────────────────
    @PutMapping("/{classId}/toggle-teacher-edit")
    public ResponseEntity<Map<String, Object>> toggleTeacherEdit(@PathVariable String classId) {
        try {
            return ResponseEntity.ok(classManagementService.toggleTeacherEdit(classId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────
    // GET available subject teachers
    // ─────────────────────────────────────────
    @GetMapping("/available-teachers")
    public ResponseEntity<List<Map<String, Object>>> getAvailableTeachers(
            @RequestParam(required = false) String currentClassId
    ) {
        return ResponseEntity.ok(classManagementService.getAvailableTeachers(currentClassId));
    }

    // ─────────────────────────────────────────
    // PUT assign a teacher to a class
    // ─────────────────────────────────────────
    @PutMapping("/{classId}/assign-teacher/{teacherId}")
    public ResponseEntity<Map<String, String>> assignTeacher(
            @PathVariable String classId,
            @PathVariable String teacherId
    ) {
        try {
            String msg = classManagementService.assignTeacher(classId, teacherId);
            return ResponseEntity.ok(Map.of("message", msg));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────
    // PUT unassign a teacher from a class
    // ─────────────────────────────────────────
    @PutMapping("/{classId}/unassign-teacher")
    public ResponseEntity<Map<String, String>> unassignTeacher(@PathVariable String classId) {
        try {
            String msg = classManagementService.unassignTeacher(classId);
            return ResponseEntity.ok(Map.of("message", msg));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────
    // DELETE a class (only if empty)
    // ─────────────────────────────────────────
    @DeleteMapping("/{classId}")
    public ResponseEntity<Map<String, String>> deleteClass(@PathVariable String classId) {
        try {
            String msg = classManagementService.deleteClass(classId);
            return ResponseEntity.ok(Map.of("message", msg));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Legacy endpoint kept for backward compat
    @PostMapping("/generate")
    public ResponseEntity<String> generateClasses(
            @RequestBody com.rcc.lms.dto.GenerateClassRequest request) {
        classManagementService.generateClasses(request);
        return ResponseEntity.ok("Classes generated successfully");
    }

    // ─────────────────────────────────────────
    // PUT toggle class dev enabled flag
    // ─────────────────────────────────────────
    @PutMapping("/{classId}/toggle-dev")
    public ResponseEntity<Map<String, Object>> toggleDevEnabled(@PathVariable String classId) {
        try {
            return ResponseEntity.ok(classManagementService.toggleDevEnabled(classId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────
    // PUT toggle class sec enabled flag
    // ─────────────────────────────────────────
    @PutMapping("/{classId}/toggle-sec")
    public ResponseEntity<Map<String, Object>> toggleSecEnabled(@PathVariable String classId) {
        try {
            return ResponseEntity.ok(classManagementService.toggleSecEnabled(classId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────
    // GET class subjects
    // ─────────────────────────────────────────
    @GetMapping("/{classId}/subjects")
    public ResponseEntity<List<Map<String, Object>>> getClassSubjects(@PathVariable String classId) {
        return ResponseEntity.ok(classManagementService.getClassSubjects(classId));
    }

    // ─────────────────────────────────────────
    // POST add subject to class
    // ─────────────────────────────────────────
    @PostMapping("/{classId}/subjects")
    public ResponseEntity<?> addSubjectToClass(
            @PathVariable String classId,
            @RequestBody Map<String, String> body
    ) {
        try {
            String subjectName = body.get("subjectName");
            if (subjectName == null || subjectName.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "subjectName is required"));
            }
            return ResponseEntity.ok(classManagementService.addSubjectToClass(classId, subjectName));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────
    // DELETE remove subject from class
    // ─────────────────────────────────────────
    @DeleteMapping("/{classId}/subjects/{subjectId}")
    public ResponseEntity<Map<String, String>> removeSubjectFromClass(
            @PathVariable String classId,
            @PathVariable String subjectId
    ) {
        try {
            String msg = classManagementService.removeSubjectFromClass(classId, subjectId);
            return ResponseEntity.ok(Map.of("message", msg));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────
    // PUT assign teacher to subject inside class
    // ─────────────────────────────────────────
    @PutMapping("/{classId}/subjects/{subjectId}/assign-teacher/{teacherId}")
    public ResponseEntity<Map<String, String>> assignTeacherToSubject(
            @PathVariable String classId,
            @PathVariable String subjectId,
            @PathVariable String teacherId
    ) {
        try {
            String msg = classManagementService.assignTeacherToSubject(classId, subjectId, teacherId);
            return ResponseEntity.ok(Map.of("message", msg));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────
    // PUT unassign teacher from subject inside class
    // ─────────────────────────────────────────
    @PutMapping("/{classId}/subjects/{subjectId}/unassign-teacher")
    public ResponseEntity<Map<String, String>> unassignTeacherFromSubject(
            @PathVariable String classId,
            @PathVariable String subjectId
    ) {
        try {
            String msg = classManagementService.unassignTeacherFromSubject(classId, subjectId);
            return ResponseEntity.ok(Map.of("message", msg));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────
    // GET eligible teachers specializing in a subject
    // ─────────────────────────────────────────
    @GetMapping("/subject-teachers")
    public ResponseEntity<List<Map<String, Object>>> getTeachersForSubject(
            @RequestParam String subjectName
    ) {
        return ResponseEntity.ok(classManagementService.getTeachersForSubject(subjectName));
    }
}