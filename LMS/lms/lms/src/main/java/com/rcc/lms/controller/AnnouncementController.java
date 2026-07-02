package com.rcc.lms.controller;

import com.rcc.lms.entity.Announcement;
import com.rcc.lms.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/announcements")
public class AnnouncementController {

    @Autowired
    private AnnouncementService announcementService;

    // =========================
    // ADMIN CREATE ANNOUNCEMENT
    // =========================
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public String createAnnouncement(
            @RequestBody Announcement announcement
    ) {
        return announcementService.createAnnouncement(announcement);
    }

    // =========================
    // GET ALL ANNOUNCEMENTS
    // =========================
    @GetMapping
    public List<Announcement> getAllAnnouncements() {
        return announcementService.getAllAnnouncements();
    }
}
