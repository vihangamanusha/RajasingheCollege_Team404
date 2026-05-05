package com.rcc.lms.repository;

import com.rcc.lms.entity.student.Marks;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MarksRepository extends JpaRepository<Marks, Integer> {

    List<Marks> findByStudent_StudentId(String studentId);
}