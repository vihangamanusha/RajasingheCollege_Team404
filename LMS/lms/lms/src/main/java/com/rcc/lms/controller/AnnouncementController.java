package com.rcc.lms.controller;

import com.rcc.lms.entity.Announcement;
import com.rcc.lms.service.AnnouncementService;
<<<<<<< HEAD

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
=======
import org.springframework.beans.factory.annotation.Autowired;
>>>>>>> TG1388
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
<<<<<<< HEAD
@RequestMapping("/announcements")
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

        return announcementService
                .createAnnouncement(announcement);
    }

    // =========================
    // GET ALL ANNOUNCEMENTS
    // EVERYONE CAN VIEW
    // =========================
    @GetMapping("/all")
    public List<Announcement> getAllAnnouncements() {

        return announcementService
                .getAllAnnouncements();
    }
}
=======
@RequestMapping("/api/announcements")
@CrossOrigin("*")
public class AnnouncementController {
    @Autowired
    private AnnouncementService service;

    // CREATE
    @PostMapping
    public Announcement createAnnouncement(@RequestBody Announcement announcement) {
        return service.saveAnnouncement(announcement);
    }

    // READ ALL
    @GetMapping
    public List<Announcement> getAllAnnouncements() {
        return service.getAllAnnouncements();
    }

    // READ ONE
    @GetMapping("/{id}")
    public Announcement getAnnouncement(@PathVariable Long id) {
        return service.getAnnouncementById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Announcement updateAnnouncement(
            @PathVariable Long id,
            @RequestBody Announcement announcement) {

        return service.updateAnnouncement(id, announcement);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteAnnouncement(@PathVariable Long id) {

        service.deleteAnnouncement(id);

        return "Announcement Deleted Successfully";
    }
}
>>>>>>> TG1388
