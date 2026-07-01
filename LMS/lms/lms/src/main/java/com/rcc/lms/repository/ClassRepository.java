package com.rcc.lms.repository;

import com.rcc.lms.entity.student.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ClassRepository extends JpaRepository<ClassEntity, String> {

    ClassEntity findByClassName(String className);

    List<ClassEntity> findByDobFromAndDobTo(LocalDate dobFrom, LocalDate dobTo);

    List<ClassEntity> findByGrade(String grade);
}
