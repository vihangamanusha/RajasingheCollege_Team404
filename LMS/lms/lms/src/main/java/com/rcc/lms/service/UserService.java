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
            throw new RuntimeException("Invalid username or password"); // Keep deleted users out!
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
    // REGISTER STUDENT WIZARD
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

    // ==============================================================
    // REGISTER TEACHER WIZARD
    // ==============================================================
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

    // ==============================================================
    // REGISTER TECHNICAL OFFICER WIZARD
    // ==============================================================
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
    // ADMIN - CREATE GENERIC USER (Restored!)
    // ==============================================================
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

    // =========================
    // ADMIN - UPDATE USER
    // =========================
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

    // ==============================================================
    // NEW: SEARCH USERS BY ROLE & TERM
    // ==============================================================
    public java.util.List<User> searchUsers(String role, String searchTerm) {
        // If search bar is empty, return everyone in that role who isn't deleted
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return userRepository.findByRoleAndStatusNot(role, "DELETED");
        }
        // Otherwise, use the custom query!
        return userRepository.searchActiveUsersByRoleAndTerm(role, searchTerm);
    }

    // ==============================================================
    // NEW: SOFT DELETE USER (AUDIT TRAIL)
    // ==============================================================
    @Transactional
    public String softDeleteUser(String username, String deletionNote) {
        User existingUser = userRepository.findByUsername(username).orElse(null);

        if (existingUser == null) {
            return "User not found!";
        }

        // Lock the account and save the Admin's note
        existingUser.setStatus("DELETED");
        existingUser.setDeletionNote(deletionNote);

        userRepository.save(existingUser);

        return "User safely removed from active system!";
    }

    // ==============================================================
    // ADMIN - HARD DELETE USER (Restored for the old controller!)
    // ==============================================================
    public String deleteUser(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return "User not found!";
        }
        userRepository.delete(user);
        return "User deleted successfully!";
    }
}