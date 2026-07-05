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
    private AnnouncementRepository repository;

    public Announcement saveAnnouncement(Announcement announcement) {

        announcement.setCreatedAt(LocalDateTime.now());

        return repository.save(announcement);
    }

    public List<Announcement> getAllAnnouncements() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    public Announcement getAnnouncementById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Announcement updateAnnouncement(Long id, Announcement newData) {

        Announcement existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found"));

        existing.setTitle(newData.getTitle());
        existing.setCategory(newData.getCategory());
        existing.setTargetAudience(newData.getTargetAudience());
        existing.setContent(newData.getContent());

        return repository.save(existing);
    }

    public void deleteAnnouncement(Long id) {
        repository.deleteById(id);
    }
}