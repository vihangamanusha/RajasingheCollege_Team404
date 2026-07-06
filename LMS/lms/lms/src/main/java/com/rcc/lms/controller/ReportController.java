package com.rcc.lms.controller;

import com.rcc.lms.dto.AdminSectionMarkDTO; // <-- NEW: Imported our backpack!
import com.rcc.lms.dto.SectionMarkDTO;
import com.rcc.lms.dto.SubjectLowPerformerDTO;
import com.rcc.lms.repository.MarksRepository;
import com.rcc.lms.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/admin/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    @Autowired
    private MarksRepository marksRepository;

    @Autowired
    private ReportService reportService;

    /**
     * Endpoint for the "Top 5 Students" Leaderboard.
     * URL: http://localhost:8080/admin/reports/leaderboard?term=Term 1&year=2026
     */
    @GetMapping("/leaderboard")
    public ResponseEntity<List<Object[]>> getLeaderboard(
            @RequestParam String term,
            @RequestParam int year) {
        return ResponseEntity.ok(marksRepository.getTopPerformers(term, year));
    }

    /**
     * Endpoint for Class-wise Performance with "Alert" Logic.
     */
    @GetMapping("/class-performance/{classId}")
    public ResponseEntity<Map<String, Object>> getClassStatus(
            @PathVariable String classId, // <-- FIXED: Changed to @PathVariable because it's in the URL path /{classId}
            @RequestParam String currentTerm,
            @RequestParam String previousTerm,
            @RequestParam int year) {

        Double currentAvg = marksRepository.getAverageByClassTermAndYear(classId, currentTerm, year);
        Double previousAvg = marksRepository.getAverageByClassTermAndYear(classId, previousTerm, year);

        // Handle nulls if no data exists yet
        currentAvg = (currentAvg != null) ? currentAvg : 0.0;
        previousAvg = (previousAvg != null) ? previousAvg : 0.0;

        String status = reportService.getPerformanceStatus(currentAvg, previousAvg);

        Map<String, Object> response = new HashMap<>();
        response.put("classId", classId);
        response.put("currentAverage", currentAvg);
        response.put("status", status); // Returns "ALERT", "GROWTH", or "STABLE"

        return ResponseEntity.ok(response);
    }

    /**
     * ==========================================
     * NEW STEP 3: Endpoint for the Section Marks Report
     * ==========================================
     * URL: http://localhost:8080/admin/reports/marks?year=2026&term=Term 1&section=10-A
     */
    @GetMapping("/marks")
    public ResponseEntity<List<AdminSectionMarkDTO>> getMarksReport(
            @RequestParam int year,
            @RequestParam String term,
            @RequestParam String section) {

        // Calls the query we wrote in Step 2!
        List<AdminSectionMarkDTO> reportData = marksRepository.getAdminSectionMarksReport(year, term, section);
        return ResponseEntity.ok(reportData);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/section-marks")
    public ResponseEntity<List<SectionMarkDTO>> getSectionMarks(
            @RequestParam int year,
            @RequestParam String term,
            @RequestParam String grade) {
        return ResponseEntity.ok(marksRepository.getSectionMarksReport(year, term, grade));
    }

    /**
     * Endpoint for Subject-wise Low Performers (marks < 40) for a specific class.
     * URL: /admin/reports/subject-low-performers?year=2026&term=Term 1&className=Grade 7A
     */
    @CrossOrigin(origins = "*")
    @GetMapping("/subject-low-performers")
    public ResponseEntity<List<SubjectLowPerformerDTO>> getSubjectLowPerformers(
            @RequestParam int year,
            @RequestParam String term,
            @RequestParam String className) {
        return ResponseEntity.ok(marksRepository.getLowPerformersByClass(year, term, className));
    }
}