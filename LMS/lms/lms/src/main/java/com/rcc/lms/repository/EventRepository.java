package com.rcc.lms.repository;

import com.rcc.lms.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository <Event,Long>{
}
