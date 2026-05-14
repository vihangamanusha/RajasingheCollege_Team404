package com.rcc.lms.repository;

import com.rcc.lms.entity.student.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRepository
        extends JpaRepository<ClassEntity, String> {

    ClassEntity findByClassName(String className);
}