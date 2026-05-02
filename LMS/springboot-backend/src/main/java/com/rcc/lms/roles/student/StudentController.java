package com.rcc.lms.roles.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Student role controller — equivalent to roles/student/studentRoutes.js
 *
 *   router.get('/', (req, res) => res.send('Student dashboard'));
 *   router.get('/marks', (req, res) => res.json({ message: '...', marks: [...] }));
 */
@RestController
@RequestMapping("/student")
public class StudentController {

    // GET /student
    @GetMapping
    public String studentDashboard() {
        return "Student dashboard";
    }

    // GET /student/marks
    @GetMapping("/marks")
    public Map<String, Object> getMarks() {
        // Example data — replace with database logic later (same comment as Node.js version)
        List<Map<String, Object>> exampleMarks = List.of(
            Map.of("subject", "Math",    "mark", 85),
            Map.of("subject", "Science", "mark", 90),
            Map.of("subject", "History", "mark", 78)
        );

        return Map.of(
            "message", "Marks fetched successfully",
            "marks", exampleMarks
        );
    }
}
