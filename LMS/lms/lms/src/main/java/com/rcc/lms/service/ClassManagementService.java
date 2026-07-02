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
        
        // 1. Validation: Class uniqueness for the academic year
        boolean classExists = classRepository.findAll().stream()
                .anyMatch(c -> c.getGrade().equalsIgnoreCase(request.getGrade())
                        && c.getClassName().substring(c.getClassName().indexOf("-") + 1).equalsIgnoreCase(request.getSection())
                        && c.getYear() == request.getYear());
        if (classExists) {
            throw new RuntimeException("Class " + className + " already exists for the year " + request.getYear());
        }

        // 2. Validation: Teacher eligibility and assignment
        Teacher teacher = null;
        if (request.getTeacherId() != null && !request.getTeacherId().trim().isEmpty()) {
            teacher = teacherRepository.findById(request.getTeacherId())
                    .orElseThrow(() -> new RuntimeException("Teacher not found: " + request.getTeacherId()));
            
            // Check if teacher has subRole "Subject Teacher"
            if (teacher.getSubRole() == null || !teacher.getSubRole().equalsIgnoreCase("Subject Teacher")) {
                throw new RuntimeException("Selected teacher is not a Subject Teacher");
            }
            
            // Check if teacher is already assigned to another class
            boolean teacherAssigned = classRepository.findAll().stream()
                    .anyMatch(c -> c.getTeacher() != null && c.getTeacher().getTeacherId().equals(request.getTeacherId()));
            if (teacherAssigned) {
                throw new RuntimeException("Teacher " + teacher.getFullName() + " is already assigned to another class");
            }
        }

        // Append a random 4-char suffix to class ID to support creating same class name multiple times
        String classId   = "CLS-" + request.getGrade() + request.getSection()
                + "-" + request.getYear() + "-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();

        ClassEntity classEntity = new ClassEntity();
        classEntity.setClassId(classId);
        classEntity.setClassName(className);
        classEntity.setGrade(request.getGrade());
        classEntity.setYear(request.getYear());
        classEntity.setDobFrom(request.getDobFrom());
        classEntity.setDobTo(request.getDobTo());
        classEntity.setAssignmentOpen(false);
        classEntity.setTeacher(teacher);
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
    // GET AVAILABLE SUBJECT TEACHERS (unassigned subject teachers)
    // =========================================================
    public List<Map<String, Object>> getAvailableTeachers(String currentClassId) {
        List<Teacher> allTeachers = teacherRepository.findAll();
        List<Map<String, Object>> available = new ArrayList<>();

        // Find teacher ID of currentClassId if any
        String currentTeacherId = null;
        if (currentClassId != null) {
            Optional<ClassEntity> o = classRepository.findById(currentClassId);
            if (o.isPresent() && o.get().getTeacher() != null) {
                currentTeacherId = o.get().getTeacher().getTeacherId();
            }
        }

        // Find all teachers already assigned to any class
        Set<String> assignedTeacherIds = new HashSet<>();
        for (ClassEntity c : classRepository.findAll()) {
            if (c.getTeacher() != null) {
                assignedTeacherIds.add(c.getTeacher().getTeacherId());
            }
        }

        for (Teacher t : allTeachers) {
            // Must have subRole as "Subject Teacher"
            if (t.getSubRole() != null && t.getSubRole().equalsIgnoreCase("Subject Teacher")) {
                String tid = t.getTeacherId();
                // Must be unassigned, OR be the teacher of the current class
                if (!assignedTeacherIds.contains(tid) || tid.equals(currentTeacherId)) {
                    Map<String, Object> map = new HashMap<>();
                    map.put("teacherId", t.getTeacherId());
                    map.put("fullName", t.getFullName());
                    map.put("subjectSpecialization", t.getSubjectSpecialization());
                    map.put("subRole", t.getSubRole());
                    map.put("isCurrent", tid.equals(currentTeacherId));
                    available.add(map);
                }
            }
        }
        return available;
    }

    // =========================================================
    // UNASSIGN TEACHER FROM CLASS
    // =========================================================
    @Transactional
    public String unassignTeacher(String classId) {
        ClassEntity classEntity = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found: " + classId));
        classEntity.setTeacher(null);
        classRepository.save(classEntity);
        return "Teacher unassigned successfully";
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