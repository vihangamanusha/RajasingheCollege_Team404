package com.rcc.lms.service;

import com.rcc.lms.entity.Announcement;
import com.rcc.lms.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnouncementService {

    @Autowired
    private AnnouncementRepository repository;

    //create
    public Announcement saveAnnouncement(Announcement announcement) {
        return repository.save(announcement);
    }

    //read all annou
    public List<Announcement> getAllAnnouncements() {
        return repository.findAll();
    }

    //read by id
    public Announcement getAnnouncementById(Long id) {
        Optional<Announcement> announcement = repository.findById(id);
        return announcement.orElse(null);
    }

    //update
    public Announcement updateAnnouncement(Long id, Announcement newData) {

        Announcement existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        existing.setTitle(newData.getTitle());
        existing.setCategory(newData.getCategory());
        existing.setTargetAudeience(newData.getTargetAudeience());
        existing.setContent(newData.getContent());

        return repository.save(existing);
    }

    //delete
    public void deleteAnnouncement(Long id) {
        repository.deleteById(id);
    }

}
