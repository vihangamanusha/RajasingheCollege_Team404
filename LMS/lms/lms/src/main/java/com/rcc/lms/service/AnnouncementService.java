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
    public Announcement getAnnouncement(Long id) {
        Optional<Announcement> optional = repository.findById(id);
        return optional.orElse(null);
    }

    //update
    public Announcement updateAnnouncement(Long id,Announcement updatedAnnouncement) {
        Announcement existing=repository.findById(id).get();

        if(existing==null) {
            existing.setTitle(updatedAnnouncement.getTitle());
            existing.setCategory(updatedAnnouncement.getCategory());
            existing.setTargetAudeience(updatedAnnouncement.getTargetAudeience());
            existing.setContent(updatedAnnouncement.getContent());

            return repository.save(existing);
        }
        return null;
    }

    //delete
    public void deleteAnnouncement(Long id) {
        repository.deleteById(id);
    }

}
