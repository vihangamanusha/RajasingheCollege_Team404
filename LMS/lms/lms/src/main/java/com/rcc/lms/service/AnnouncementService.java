package com.rcc.lms.service;

import com.rcc.lms.entity.Announcement;
import com.rcc.lms.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnouncementService {

    @Autowired
    private AnnouncementRepository repository;

    // CREATE
    public Announcement saveAnnouncement(Announcement announcement) {
        return repository.save(announcement);
    }

    // READ ALL
    public List<Announcement> getAllAnnouncements() {
        return repository.findAllByOrderByCreatedDateDesc();
    }

    // READ ONE
    public Announcement getAnnouncementById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    // UPDATE
    public Announcement updateAnnouncement(Integer id, Announcement newData) {

        Announcement existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found"));

        existing.setTitle(newData.getTitle());
        existing.setContent(newData.getContent());

        return repository.save(existing);
    }

    // DELETE
    public void deleteAnnouncement(Integer id) {
        repository.deleteById(id);
    }
}