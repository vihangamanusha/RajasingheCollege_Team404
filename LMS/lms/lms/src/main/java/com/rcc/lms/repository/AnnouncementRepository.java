package com.rcc.lms.repository;

import com.rcc.lms.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
}
