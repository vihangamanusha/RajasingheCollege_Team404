package com.rcc.lms.repository;

import com.rcc.lms.entity.TeacherAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherAssignmentRepository extends JpaRepository<TeacherAssignment, String> {
    List<TeacherAssignment> findByTeacherId(String teacherId);
}
