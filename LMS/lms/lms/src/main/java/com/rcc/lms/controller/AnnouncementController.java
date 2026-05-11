package com.rcc.lms.controller;

import com.rcc.lms.entity.Announcement;
import com.rcc.lms.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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
