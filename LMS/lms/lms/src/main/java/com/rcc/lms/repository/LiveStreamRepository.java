package com.rcc.lms.repository;

import com.rcc.lms.entity.Livestream;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LiveStreamRepository extends JpaRepository<Livestream, Long> {
}