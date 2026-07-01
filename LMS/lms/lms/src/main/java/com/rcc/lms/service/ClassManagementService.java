package com.rcc.lms.service;

import com.rcc.lms.dto.CreateClassRequest;
import com.rcc.lms.entity.Teacher;
import com.rcc.lms.entity.student.ClassEntity;
import com.rcc.lms.entity.student.Student;
import com.rcc.lms.repository.ClassRepository;
import com.rcc.lms.repository.StudentRepository;
import com.rcc.lms.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
public class ClassManagementService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    // =========================================================
    // GET STUDENT POOL (DOB range, unassigned students only)
    // =========================================================
    public List<Map<String, Object>> getStudentPool(LocalDate dobFrom, LocalDate dobTo) {
        List<Student> students = studentRepository
                .findByDateOfBirthBetweenAndClassEntityIsNull(dobFrom, dobTo);
        return toStudentMapList(students);
    }

    // =========================================================
    // GET ALL STUDENTS IN DOB RANGE (assigned + unassigned)
    // Used for showing the full batch context
    // =========================================================
    public List<Map<String, Object>> getAllStudentsByDob(LocalDate dobFrom, LocalDate dobTo) {
        List<Student> students = studentRepository
                .findByDateOfBirthBetween(dobFrom, dobTo);
        return toStudentMapList(students);
    }

    // =========================================================
    // GET CLASSES FOR A DOB BATCH
    // =========================================================
    public List<Map<String, Object>> getClassesForBatch(LocalDate dobFrom, LocalDate dobTo) {
        List<ClassEntity> classes = classRepository.findByDobFromAndDobTo(dobFrom, dobTo);
        return toClassMapList(classes);
    }

    // =========================================================
    // GET ALL CLASSES
    // =========================================================
    public List<ClassEntity> getAllClasses() {
        return classRepository.findAll();
    }

    // =========================================================
    // GET STUDENTS IN A CLASS (roster)
    // =========================================================
    public List<Map<String, Object>> getClassRoster(String classId) {
        List<Student> students = studentRepository.findByClassEntityClassId(classId);
        return toStudentMapList(students);
    }

    // =========================================================
    // CREATE A NEW EMPTY CLASS
    // =========================================================
    @Transactional
    public Map<String, Object> createClass(CreateClassRequest request) {
        String className = request.getGrade() + "-" + request.getSection();
        String classId   = "CLS-" + request.getGrade() + request.getSection()
                + "-" + request.getYear();

        // Check if class already exists
        if (classRepository.existsById(classId)) {
            throw new RuntimeException("Class " + className + " already exists for " + request.getYear());
        }

        ClassEntity classEntity = new ClassEntity();
        classEntity.setClassId(classId);
        classEntity.setClassName(className);
        classEntity.setGrade(request.getGrade());
        classEntity.setYear(request.getYear());
        classEntity.setDobFrom(request.getDobFrom());
        classEntity.setDobTo(request.getDobTo());
        classEntity.setAssignmentOpen(false);
        classRepository.save(classEntity);

        return toClassMap(classEntity);
    }

    // =========================================================
    // ASSIGN STUDENT TO CLASS (move from pool)
    // =========================================================
    @Transactional
    public String assignStudent(String classId, String studentId) {
        ClassEntity classEntity = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found: " + classId));
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found: " + studentId));

        student.setClassEntity(classEntity);
        studentRepository.save(student);
        return "Student assigned to " + classEntity.getClassName();
    }

    // =========================================================
    // REMOVE STUDENT FROM CLASS (return to pool)
    // =========================================================
    @Transactional
    public String removeStudent(String classId, String studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found: " + studentId));

        if (student.getClassEntity() == null ||
                !student.getClassEntity().getClassId().equals(classId)) {
            throw new RuntimeException("Student is not in this class");
        }

        student.setClassEntity(null);
        studentRepository.save(student);
        return "Student removed from class";
    }

    // =========================================================
    // TOGGLE TEACHER ASSIGNMENT PERMISSION
    // =========================================================
    @Transactional
    public Map<String, Object> toggleTeacherEdit(String classId) {
        ClassEntity classEntity = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found: " + classId));
        classEntity.setAssignmentOpen(!classEntity.isAssignmentOpen());
        classRepository.save(classEntity);

        Map<String, Object> result = new HashMap<>();
        result.put("classId", classId);
        result.put("assignmentOpen", classEntity.isAssignmentOpen());
        result.put("message", classEntity.isAssignmentOpen()
                ? "Teacher assignment enabled" : "Teacher assignment disabled");
        return result;
    }

    // =========================================================
    // ASSIGN TEACHER TO CLASS
    // =========================================================
    @Transactional
    public String assignTeacher(String classId, String teacherId) {
        ClassEntity classEntity = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found: " + classId));
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found: " + teacherId));

        classEntity.setTeacher(teacher);
        classRepository.save(classEntity);
        return "Teacher " + teacher.getFullName() + " assigned to " + classEntity.getClassName();
    }

    // =========================================================
    // DELETE A CLASS (only if empty)
    // =========================================================
    @Transactional
    public String deleteClass(String classId) {
        ClassEntity classEntity = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found: " + classId));

        List<Student> students = studentRepository.findByClassEntityClassId(classId);
        if (!students.isEmpty()) {
            throw new RuntimeException(
                    "Cannot delete class with " + students.size() + " student(s) assigned. Remove them first.");
        }

        classRepository.delete(classEntity);
        return "Class " + classEntity.getClassName() + " deleted";
    }

    // =========================================================
    // PRIVATE HELPERS
    // =========================================================
    private Map<String, Object> toStudentMap(Student s) {
        Map<String, Object> m = new HashMap<>();
        m.put("studentId", s.getStudentId());
        m.put("fullName", s.getFullName());
        m.put("dateOfBirth", s.getDateOfBirth() != null ? s.getDateOfBirth().toString() : null);
        m.put("medium", s.getMedium() != null ? s.getMedium().toString() : null);
        m.put("classId", s.getClassEntity() != null ? s.getClassEntity().getClassId() : null);
        m.put("className", s.getClassEntity() != null ? s.getClassEntity().getClassName() : null);
        return m;
    }

    private List<Map<String, Object>> toStudentMapList(List<Student> students) {
        List<Map<String, Object>> list = new ArrayList<>();
        for (Student s : students) list.add(toStudentMap(s));
        return list;
    }

    private Map<String, Object> toClassMap(ClassEntity c) {
        Map<String, Object> m = new HashMap<>();
        m.put("classId", c.getClassId());
        m.put("className", c.getClassName());
        m.put("grade", c.getGrade());
        m.put("year", c.getYear());
        m.put("assignmentOpen", c.isAssignmentOpen());
        m.put("dobFrom", c.getDobFrom() != null ? c.getDobFrom().toString() : null);
        m.put("dobTo", c.getDobTo() != null ? c.getDobTo().toString() : null);
        m.put("teacherName", c.getTeacher() != null ? c.getTeacher().getFullName() : null);
        m.put("teacherId", c.getTeacher() != null ? c.getTeacher().getTeacherId() : null);
        // Include student count
        int count = studentRepository.findByClassEntityClassId(c.getClassId()).size();
        m.put("studentCount", count);
        return m;
    }

    private List<Map<String, Object>> toClassMapList(List<ClassEntity> classes) {
        List<Map<String, Object>> list = new ArrayList<>();
        for (ClassEntity c : classes) list.add(toClassMap(c));
        return list;
    }

    // Legacy method kept for backward compatibility
    public void generateClasses(com.rcc.lms.dto.GenerateClassRequest request) {
        // No-op — replaced by manual assignment flow
    }
}