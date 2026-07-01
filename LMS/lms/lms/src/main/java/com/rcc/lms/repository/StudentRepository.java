package com.rcc.lms.repository;

<<<<<<< HEAD
import com.rcc.lms.entity.student.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {

    Optional<Student> findByUserUserId(String userId);

    List<Student> findByDateOfBirthBetween(LocalDate start, LocalDate end);

    // Students in DOB range with NO class assigned yet = the pool
    List<Student> findByDateOfBirthBetweenAndClassEntityIsNull(LocalDate start, LocalDate end);

    // Students already assigned to a specific class
    List<Student> findByClassEntityClassId(String classId);
}
=======

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<com.rcc.lms.student.Student, Long> {
    boolean existsByStudentId(String studentId);
}
>>>>>>> TG1388
