package com.rcc.lms.repository;

import com.rcc.lms.entity.CurriculumSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurriculumSubjectRepository extends JpaRepository<CurriculumSubject, String> {
    java.util.List<CurriculumSubject> findByStatus(String status);
    long countByStatus(String status);
}
