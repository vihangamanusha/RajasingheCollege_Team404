package com.rcc.lms.controller;

import com.rcc.lms.entity.SystemConfig;
import com.rcc.lms.repository.SystemConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin/config")
public class SystemConfigController {

    @Autowired
    private SystemConfigRepository systemConfigRepository;

    @GetMapping("/active-exam-settings")
    public ResponseEntity<Map<String, String>> getActiveExamSettings() {
        try {
            SystemConfig yearConfig = systemConfigRepository.findById("active_academic_year")
                    .orElse(new SystemConfig("active_academic_year", "2026"));
            SystemConfig termConfig = systemConfigRepository.findById("active_term")
                    .orElse(new SystemConfig("active_term", "Term 1"));

            Map<String, String> response = new HashMap<>();
            response.put("academicYear", yearConfig.getConfigValue());
            response.put("term", termConfig.getConfigValue());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/active-exam-settings")
    public ResponseEntity<String> saveActiveExamSettings(@RequestBody Map<String, String> settings) {
        try {
            String academicYear = settings.get("academicYear");
            String term = settings.get("term");

            // Validations
            if (academicYear == null || !academicYear.matches("^\\d{4}$")) {
                return ResponseEntity.badRequest().body("Error: Academic Year must be a valid 4-digit number!");
            }
            int yearInt = Integer.parseInt(academicYear);
            int currentYear = java.time.LocalDate.now().getYear();
            if (yearInt < currentYear) {
                return ResponseEntity.badRequest().body("Error: Academic Year cannot be a previous year!");
            }
            if (term == null || term.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Error: Term Test selection is required!");
            }

            SystemConfig yearConfig = systemConfigRepository.findById("active_academic_year")
                    .orElse(new SystemConfig("active_academic_year", ""));
            yearConfig.setConfigValue(academicYear);
            systemConfigRepository.save(yearConfig);

            SystemConfig termConfig = systemConfigRepository.findById("active_term")
                    .orElse(new SystemConfig("active_term", ""));
            termConfig.setConfigValue(term);
            systemConfigRepository.save(termConfig);

            return ResponseEntity.ok("Exam configuration settings updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}
