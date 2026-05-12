package com.rcc.lms.repository;

import com.rcc.lms.entity.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MarksRepository extends JpaRepository<Mark, Integer> {

    // 1. Get average for a specific class, term, and year
    @Query("SELECT AVG(m.assignmentMark) FROM Mark m " +
            "WHERE m.student.classEntity.classId = :classId AND m.term = :term AND m.academicYear = :year")
    Double getAverageByClassTermAndYear(@Param("classId") String classId,
                                        @Param("term") String term,
                                        @Param("year") int year);

    // 2. Get Top 5 Students for your Leaderboard logic
    @Query("SELECT m.student.fullName, SUM(m.assignmentMark) as total " +
            "FROM Mark m WHERE m.term = :term AND m.academicYear = :year " +
            "GROUP BY m.student.studentId, m.student.fullName " +
            "ORDER BY total DESC")
    List<Object[]> getTopPerformers(@Param("term") String term, @Param("year") int year);
}