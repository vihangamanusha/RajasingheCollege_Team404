package com.rcc.lms.repository;

import com.rcc.lms.entity.TeacherMarks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import java.util.List;

public interface TeacherMarksRepository extends JpaRepository<TeacherMarks, Integer> {
    Optional<TeacherMarks> findByStudentIdAndSubjectIdAndTermAndAcademicYear(
            String studentId, String subjectId, String term, int academicYear);

    List<TeacherMarks> findByStudentIdInAndSubjectIdAndTermAndAcademicYear(
            List<String> studentIds, String subjectId, String term, int academicYear);
}