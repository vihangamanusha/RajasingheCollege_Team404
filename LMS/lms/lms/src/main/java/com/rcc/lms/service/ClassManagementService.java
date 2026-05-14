package com.rcc.lms.service;

import com.rcc.lms.dto.GenerateClassRequest;
import com.rcc.lms.entity.student.ClassEntity;
import com.rcc.lms.entity.student.Student;
import com.rcc.lms.entity.student.StudentMarks;
import com.rcc.lms.repository.ClassRepository;
import com.rcc.lms.repository.StudentMarksRepository;
import com.rcc.lms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class ClassManagementService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentMarksRepository marksRepository;

    @Autowired
    private ClassRepository classRepository;

    public void generateClasses(GenerateClassRequest request) {

        // =====================================
        // GET STUDENTS BY DOB RANGE
        // =====================================

        List<Student> students =
                studentRepository.findByDateOfBirthBetween(
                        request.getDobFrom(),
                        request.getDobTo()
                );

        // =====================================
        // CALCULATE AVERAGES
        // =====================================

        Map<Student, Double> averages = new HashMap<>();

        for (Student student : students) {

            List<StudentMarks> marks =
                    marksRepository.findByStudent(student);

            double avg = calculateAverage(marks);

            averages.put(student, avg);
        }

        // =====================================
        // SORT STUDENTS
        // =====================================

        students.sort((s1, s2) ->
                Double.compare(
                        averages.get(s2),
                        averages.get(s1)
                )
        );

        // =====================================
        // CREATE CLASSES IF NOT EXISTS
        // =====================================

        List<ClassEntity> classes = new ArrayList<>();

        for (String section : request.getClassSections()) {

            String className = request.getGrade() + "-" + section;

            ClassEntity classEntity =
                    classRepository.findByClassName(className);

            if (classEntity == null) {

                classEntity = new ClassEntity();

                classEntity.setClassId(
                        "CLS-" + request.getGrade() + section
                );

                classEntity.setClassName(className);

                classEntity.setYear(LocalDate.now().getYear());

                classRepository.save(classEntity);
            }

            classes.add(classEntity);
        }

        // =====================================
        // ROUND ROBIN ASSIGNMENT
        // =====================================

        int classIndex = 0;

        for (Student student : students) {

            ClassEntity assignedClass =
                    classes.get(classIndex);

            student.setClassEntity(assignedClass);

            studentRepository.save(student);

            classIndex++;

            if (classIndex >= classes.size()) {
                classIndex = 0;
            }
        }
    }

    private double calculateAverage(List<StudentMarks> marks) {

        if (marks == null || marks.isEmpty()) {
            return 0;
        }

        int total = 0;

        for (StudentMarks mark : marks) {
            total += mark.getAssignmentMark();
        }

        return (double) total / marks.size();
    }
}