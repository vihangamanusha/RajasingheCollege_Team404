package com.rcc.lms.service;

import com.rcc.lms.entity.Announcement;
import com.rcc.lms.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnnouncementService {

    @Autowired
    private AnnouncementRepository announcementRepository;

    // =========================
    // CREATE ANNOUNCEMENT
    // =========================
    public String createAnnouncement(Announcement announcement) {

        // automatically save current date/time
        announcement.setCreatedDate(LocalDateTime.now());

        // save announcement
        announcementRepository.save(announcement);

        return "Announcement Added Successfully!";
    }

    // =========================
    // GET ALL ANNOUNCEMENTS
    // NEWEST FIRST
    // =========================
    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAllByOrderByCreatedDateDesc();
    }
}
