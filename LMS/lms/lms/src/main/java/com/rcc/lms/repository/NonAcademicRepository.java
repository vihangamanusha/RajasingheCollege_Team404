package com.rcc.lms.repository;

import com.rcc.lms.entity.NonAcademic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NonAcademicRepository extends JpaRepository<NonAcademic, String> {

    List<NonAcademic> findByStatus(String status);

    @Query("SELECT n FROM NonAcademic n WHERE n.status = 'ACTIVE' AND (LOWER(n.nonAcademicId) LIKE LOWER(CONCAT('%', :term, '%')) OR LOWER(n.fullName) LIKE LOWER(CONCAT('%', :term, '%')) OR LOWER(n.email) LIKE LOWER(CONCAT('%', :term, '%')) OR LOWER(n.designation) LIKE LOWER(CONCAT('%', :term, '%')))")
    List<NonAcademic> searchActiveNonAcademic(@Param("term") String term);

    @Query("SELECT n.nonAcademicId FROM NonAcademic n WHERE n.nonAcademicId LIKE 'na%'")
    List<String> findNonAcademicIds();
}
