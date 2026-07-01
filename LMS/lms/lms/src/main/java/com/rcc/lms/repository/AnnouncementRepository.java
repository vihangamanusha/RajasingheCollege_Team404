package com.rcc.lms.repository;

import com.rcc.lms.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD

import java.util.List;

public interface AnnouncementRepository
        extends JpaRepository<Announcement, Integer> {

    // =========================
    // GET LATEST ANNOUNCEMENTS FIRST
    // =========================
    List<Announcement> findAllByOrderByCreatedDateDesc();
}
=======
import org.springframework.data.repository.CrudRepository;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
}
>>>>>>> TG1388
