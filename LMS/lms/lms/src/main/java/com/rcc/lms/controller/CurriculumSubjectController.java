package com.rcc.lms.controller;

import com.rcc.lms.entity.CurriculumSubject;
import com.rcc.lms.repository.CurriculumSubjectRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/curriculum-subjects")
@CrossOrigin(origins = "*")
public class CurriculumSubjectController {

    @Autowired
    private CurriculumSubjectRepository repository;

    @PostConstruct
    public void seedSubjects() {
        if (repository.count() == 0) {
            List<String> defaultSubjects = Arrays.asList(
                "Mathematics", "Science", "History", "English", "Sinhala",
                "Buddhism", "ICT", "Geography", "Health", "Art", "Music", "Commerce"
            );
            List<CurriculumSubject> seeded = defaultSubjects.stream()
                .map(CurriculumSubject::new)
                .collect(Collectors.toList());
            repository.saveAll(seeded);
        }
    }

    @GetMapping
    public ResponseEntity<List<String>> getAllSubjects() {
        List<String> subjects = repository.findAll().stream()
                .filter(sub -> !"DELETED".equalsIgnoreCase(sub.getStatus()))
                .map(CurriculumSubject::getSubjectName)
                .collect(Collectors.toList());
        return ResponseEntity.ok(subjects);
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> addSubject(@RequestBody Map<String, String> body) {
        String subjectName = body.get("subjectName");
        if (subjectName == null || subjectName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Subject name cannot be empty"));
        }
        subjectName = subjectName.trim();

        final String finalSubjectName = subjectName;
        java.util.Optional<CurriculumSubject> existingOpt = repository.findAll().stream()
                .filter(sub -> sub.getSubjectName().equalsIgnoreCase(finalSubjectName))
                .findFirst();
        if (existingOpt.isPresent()) {
            CurriculumSubject existing = existingOpt.get();
            if ("ACTIVE".equals(existing.getStatus())) {
                return ResponseEntity.badRequest().body(Map.of("error", "Subject already exists"));
            } else {
                existing.setStatus("ACTIVE");
                existing.setDeletionNote(null);
                repository.save(existing);
                return ResponseEntity.ok(Map.of("message", "Subject added successfully"));
            }
        }

        repository.save(new CurriculumSubject(subjectName));
        return ResponseEntity.ok(Map.of("message", "Subject added successfully"));
    }

    @DeleteMapping("/{subjectName}")
    public ResponseEntity<Map<String, String>> deleteSubject(
            @PathVariable String subjectName,
            @RequestParam String deletionNote) {

        java.util.Optional<CurriculumSubject> opt = repository.findById(subjectName);
        if (!opt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        CurriculumSubject subject = opt.get();
        subject.setStatus("DELETED");
        subject.setDeletionNote(deletionNote);
        repository.save(subject);

        return ResponseEntity.ok(Map.of("message", "Subject deleted successfully"));
    }
}
