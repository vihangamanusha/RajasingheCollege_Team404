package com.rcc.lms.roles.teacher;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Teacher role controller — equivalent to roles/teacher/teacherRoutes.js
 *
 *   router.get('/', (req, res) => res.send('Teacher dashboard'));
 */
@RestController
@RequestMapping("/teacher")
public class TeacherController {

    // GET /teacher
    @GetMapping
    public String teacherDashboard() {
        return "Teacher dashboard";
    }
}
