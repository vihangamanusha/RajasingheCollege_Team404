package com.rcc.lms.service;

import com.rcc.lms.entity.User;
import com.rcc.lms.entity.student.Student;
import com.rcc.lms.entity.Teacher;
import com.rcc.lms.entity.TechnicalOfficer;
import com.rcc.lms.repository.TeacherRepository;
import com.rcc.lms.repository.TechnicalOfficerRepository;
import com.rcc.lms.repository.UserRepository;
import com.rcc.lms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.rcc.lms.dto.LoginRequest;
import com.rcc.lms.dto.LoginResponse;
import com.rcc.lms.dto.StudentRegistrationRequest;
import com.rcc.lms.dto.TeacherRegistrationRequest;
import com.rcc.lms.dto.TechRegistrationRequest;
import com.rcc.lms.security.JwtUtil;

import java.time.LocalDate;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private TechnicalOfficerRepository technicalOfficerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // =========================
    // LOGIN USER
    // =========================
    public LoginResponse loginUser(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElse(null);

        if (user == null || "DELETED".equals(user.getStatus())) {
            throw new RuntimeException("Invalid username or password");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        String token = jwtUtil.generateToken(user.getUsername());

        return new LoginResponse(
                "Login successful",
                user.getUsername(),
                user.getRole(),
                token
        );
    }

    // ==============================================================
    // REGISTER USER WIZARDS (Student, Teacher, Tech Officer)
    // ==============================================================

    @Transactional
    public String registerNewStudent(StudentRegistrationRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return "Username already exists!";
        }

        User newUser = new User();
        newUser.setUserId(request.getUserId());
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setRole(request.getRole());
        newUser.setCreatedDate(LocalDate.now());
        newUser.setStatus("ACTIVE");
        userRepository.save(newUser);

        Student newStudent = new Student();
        newStudent.setStudentId(request.getUserId());
        newStudent.setFullName(request.getFullName());
        newStudent.setDateOfBirth(request.getDateOfBirth());
        newStudent.setAddress(request.getAddress());
        newStudent.setMedium(com.rcc.lms.entity.student.Medium.valueOf(request.getMedium()));
        newStudent.setContactNumber(request.getContactNumber());
        newStudent.setUser(newUser);
        studentRepository.save(newStudent);

        return "Student successfully registered!";
    }

    @Transactional
    public String registerNewTeacher(TeacherRegistrationRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return "Username already exists!";
        }

        User newUser = new User();
        newUser.setUserId(request.getUserId());
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setRole(request.getRole());
        newUser.setCreatedDate(LocalDate.now());
        newUser.setStatus("ACTIVE");
        userRepository.save(newUser);

        Teacher newTeacher = new Teacher();
        newTeacher.setTeacherId(request.getUserId());
        newTeacher.setFullName(request.getFullName());
        newTeacher.setSubjectSpecialization(request.getSubjectSpecialization());
        newTeacher.setContactNumber(request.getContactNumber());
        newTeacher.setUser(newUser);
        teacherRepository.save(newTeacher);

        return "Teacher successfully registered!";
    }

    @Transactional
    public String registerNewTechOfficer(TechRegistrationRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return "Username already exists!";
        }

        User newUser = new User();
        newUser.setUserId(request.getUserId());
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setRole(request.getRole());
        newUser.setCreatedDate(LocalDate.now());
        newUser.setStatus("ACTIVE");
        userRepository.save(newUser);

        TechnicalOfficer newTech = new TechnicalOfficer();
        newTech.setTechnicalOfficerId(request.getUserId());
        newTech.setFullName(request.getFullName());
        newTech.setProfileEmail(request.getEmail());
        newTech.setContactNumber(request.getContactNumber());
        newTech.setPosition(request.getPosition());
        newTech.setAssignedArea(request.getAssignedArea());
        newTech.setUser(newUser);
        technicalOfficerRepository.save(newTech);

        return "Technical Officer successfully registered!";
    }

    // ==============================================================
    // SEARCH USERS BY ROLE & TERM
    // ==============================================================
    public java.util.List<User> searchUsers(String role, String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return userRepository.findByRoleAndStatusNot(role, "DELETED");
        }
        return userRepository.searchActiveUsersByRoleAndTerm(role, searchTerm);
    }

    // ==============================================================
    // STUDENT PROFILE MANAGEMENT
    // ==============================================================
    public Student getStudentProfile(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user != null) {
            return studentRepository.findById(user.getUserId()).orElse(null);
        }
        return null;
    }

    @Transactional
    public String updateStudentProfile(String username, StudentRegistrationRequest request) {
        User existingUser = userRepository.findByUsername(username).orElse(null);
        if (existingUser == null) return "User not found!";

        if (request.getEmail() != null) existingUser.setEmail(request.getEmail());
        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        userRepository.save(existingUser);

        Student existingStudent = studentRepository.findById(existingUser.getUserId()).orElse(null);
        if (existingStudent != null) {
            existingStudent.setFullName(request.getFullName());
            existingStudent.setDateOfBirth(request.getDateOfBirth());
            existingStudent.setAddress(request.getAddress());
            existingStudent.setContactNumber(request.getContactNumber());
            if (request.getMedium() != null) {
                existingStudent.setMedium(com.rcc.lms.entity.student.Medium.valueOf(request.getMedium()));
            }
            studentRepository.save(existingStudent);
        }
        return "Student profile updated successfully!";
    }

    // ==============================================================
    // TEACHER PROFILE MANAGEMENT (FIXES "CANNOT FIND SYMBOL" ERROR)
    // ==============================================================
    public Teacher getTeacherProfile(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user != null) {
            return teacherRepository.findById(user.getUserId()).orElse(null);
        }
        return null;
    }

    @Transactional
    public String updateTeacherProfile(String username, TeacherRegistrationRequest request) {
        User existingUser = userRepository.findByUsername(username).orElse(null);
        if (existingUser == null) return "User not found!";

        // Update User Account Details
        if (request.getEmail() != null) existingUser.setEmail(request.getEmail());
        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        userRepository.save(existingUser);

        // Update Teacher Professional Details
        Teacher existingTeacher = teacherRepository.findById(existingUser.getUserId()).orElse(null);
        if (existingTeacher != null) {
            existingTeacher.setFullName(request.getFullName());
            existingTeacher.setSubjectSpecialization(request.getSubjectSpecialization());
            existingTeacher.setContactNumber(request.getContactNumber());
            teacherRepository.save(existingTeacher);
        }
        return "Teacher profile updated successfully!";
    }

    // ==============================================================
    // TECH OFFICER PROFILE MANAGEMENT (FIXES "CANNOT FIND SYMBOL" ERROR)
    // ==============================================================
    public TechnicalOfficer getTechOfficerProfile(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user != null) {
            return technicalOfficerRepository.findById(user.getUserId()).orElse(null);
        }
        return null;
    }

    @Transactional
    public String updateTechOfficerProfile(String username, TechRegistrationRequest request) {
        User existingUser = userRepository.findByUsername(username).orElse(null);
        if (existingUser == null) return "User not found!";

        // Update User Account Details
        if (request.getEmail() != null) existingUser.setEmail(request.getEmail());
        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        userRepository.save(existingUser);

        // Update Tech Officer Details
        TechnicalOfficer existingTech = technicalOfficerRepository.findById(existingUser.getUserId()).orElse(null);
        if (existingTech != null) {
            existingTech.setFullName(request.getFullName());
            existingTech.setPosition(request.getPosition());
            existingTech.setAssignedArea(request.getAssignedArea());
            existingTech.setContactNumber(request.getContactNumber());
            technicalOfficerRepository.save(existingTech);
        }
        return "Technical Officer profile updated successfully!";
    }

    // ==============================================================
    // ADMIN ACTIONS (Updates, Generic Creation, and Deletion)
    // ==============================================================

    public String updateUser(String username, User updatedUser) {
        User existingUser = userRepository.findByUsername(username).orElse(null);
        if (existingUser == null) return "User not found!";
        if (updatedUser.getRole() != null) existingUser.setRole(updatedUser.getRole());
        if (updatedUser.getSubRole() != null) existingUser.setSubRole(updatedUser.getSubRole());
        if (updatedUser.getEmail() != null) existingUser.setEmail(updatedUser.getEmail());
        if (updatedUser.getStatus() != null) existingUser.setStatus(updatedUser.getStatus());
        userRepository.save(existingUser);
        return "User updated successfully!";
    }

    @Transactional
    public String hardDeleteUser(String username) {
        User existingUser = userRepository.findByUsername(username).orElse(null);
        if (existingUser == null) return "User not found!";

        String role = existingUser.getRole();
        String userId = existingUser.getUserId();

        // 1. Delete specialized profile first (Foreign Key Safety)
        if ("ROLE_STUDENT".equals(role)) studentRepository.deleteById(userId);
        else if ("ROLE_TEACHER".equals(role)) teacherRepository.deleteById(userId);
        else if ("ROLE_TECHNICAL_OFFICER".equals(role)) technicalOfficerRepository.deleteById(userId);

        // 2. Delete the Authentication User
        userRepository.delete(existingUser);
        return "User permanently deleted from the system!";
    }

    public String createUserByAdmin(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "Username already exists!";
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedDate(LocalDate.now());
        user.setStatus("ACTIVE");
        userRepository.save(user);
        return "User created successfully by admin!";
    }

    public String deleteUser(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) return "User not found!";
        userRepository.delete(user);
        return "User deleted successfully!";
    }
}