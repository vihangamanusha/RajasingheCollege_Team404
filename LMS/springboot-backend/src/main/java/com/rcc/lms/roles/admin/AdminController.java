package com.rcc.lms.roles.admin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Admin role controller — equivalent to roles/admin/adminRoutes.js
 *
 *   router.get('/', (req, res) => res.send('Admin dashboard'));
 */
@RestController
@RequestMapping("/admin")
public class AdminController {

    // GET /admin
    @GetMapping
    public String adminDashboard() {
        return "Admin dashboard";
    }
}
