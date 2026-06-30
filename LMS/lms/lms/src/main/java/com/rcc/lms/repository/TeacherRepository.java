package com.rcc.lms.repository;

import com.rcc.lms.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, String> {
    boolean existsByNic(String nic);
}