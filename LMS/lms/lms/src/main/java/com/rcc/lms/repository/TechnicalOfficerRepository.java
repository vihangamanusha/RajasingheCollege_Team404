package com.rcc.lms.repository;

import com.rcc.lms.entity.TechnicalOfficer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TechnicalOfficerRepository extends JpaRepository<TechnicalOfficer, String> {
}