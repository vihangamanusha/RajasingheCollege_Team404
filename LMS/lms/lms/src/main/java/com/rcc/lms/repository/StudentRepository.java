package com.rcc.lms.repository;

import com.rcc.lms.entity.student.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {

    // ========================================================================
    // CUSTOM QUERY: FIND BY USER ID
    // Spring Boot is smart enough to read "findByUserUserId" and automatically
    // write a SQL query that joins the Student table to the User table
    // and searches for the specific User ID!
    // ========================================================================
    Optional<Student> findByUserUserId(String userId);
}