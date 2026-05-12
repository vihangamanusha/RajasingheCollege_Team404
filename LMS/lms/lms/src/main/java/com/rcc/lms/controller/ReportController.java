package com.rcc.lms.controller;

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
@CrossOrigin(origins = "http://localhost:3000") // Allows your React app to talk to the Backend
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
     * This combines the Repository data with your Service logic.
     */
    @GetMapping("/class-performance/{classId}")
    public ResponseEntity<Map<String, Object>> getClassStatus(
            @RequestParam String classId,
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
}