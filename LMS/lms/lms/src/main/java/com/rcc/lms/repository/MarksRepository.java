package com.rcc.lms.repository;

import com.rcc.lms.entity.Mark;
import com.rcc.lms.dto.AdminSectionMarkDTO; // 1. Added the import for our new backpack
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarksRepository extends JpaRepository<Mark, Integer> {

    // 1. Existing: Get average for a specific class, term, and year
    @Query("SELECT AVG(m.assignmentMark) FROM Mark m " +
            "WHERE m.student.classEntity.classId = :classId AND m.term = :term AND m.academicYear = :year")
    Double getAverageByClassTermAndYear(@Param("classId") String classId,
                                        @Param("term") String term,
                                        @Param("year") int year);

    // 2. Existing: Get Top 5 Students for your Leaderboard logic
    @Query("SELECT m.student.fullName, SUM(m.assignmentMark) as total " +
            "FROM Mark m WHERE m.term = :term AND m.academicYear = :year " +
            "GROUP BY m.student.studentId, m.student.fullName " +
            "ORDER BY total DESC")
    List<Object[]> getTopPerformers(@Param("term") String term, @Param("year") int year);

    // ==========================================
    // 3. NEW: Report Generation Query for Admin
    // ==========================================
    @Query("SELECT new com.rcc.lms.dto.AdminSectionMarkDTO(s.fullName, sub.subjectName, m.assignmentMark) " +
            "FROM Mark m " +
            "JOIN m.student s " +
            "JOIN m.subject sub " +
            "JOIN s.classEntity c " +
            "WHERE m.academicYear = :year " +
            "AND m.term = :term " +
            "AND (:section = 'ALL' OR c.className = :section)")
    List<AdminSectionMarkDTO> getAdminSectionMarksReport(
            @Param("year") int year,
            @Param("term") String term,
            @Param("section") String section
    );
}