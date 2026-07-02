package com.rcc.lms.repository;

import com.rcc.lms.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Integer> {

    // =========================
    // GET LATEST ANNOUNCEMENTS FIRST
    // =========================
    List<Announcement> findAllByOrderByCreatedDateDesc();
}
