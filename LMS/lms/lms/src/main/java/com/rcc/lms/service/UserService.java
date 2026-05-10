package com.rcc.lms.service;

import com.rcc.lms.entity.User;
import com.rcc.lms.entity.student.Student; // IMPORT STUDENT ENTITY
import com.rcc.lms.repository.UserRepository;
import com.rcc.lms.repository.StudentRepository; // IMPORT STUDENT REPOSITORY
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // IMPORT TRANSACTIONAL
import com.rcc.lms.dto.LoginRequest;
import com.rcc.lms.dto.LoginResponse;
import com.rcc.lms.dto.StudentRegistrationRequest; // IMPORT THE NEW DTO
import com.rcc.lms.security.JwtUtil;

import java.time.LocalDate;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Inject the new Student Repository
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // =========================
    // LOGIN USER (UNTOUCHED)
    // =========================
    public LoginResponse loginUser(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElse(null);

        if (user == null) {
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
    // NEW: REGISTER STUDENT WIZARD (SAVING TO BOTH TABLES)
    // The @Transactional ensures if one table fails, both roll back!
    // ==============================================================
    @Transactional
    public String registerNewStudent(StudentRegistrationRequest request) {

        // 1. Check if username exists in the system
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return "Username already exists!";
        }

        // 2. Create and populate the User (Auth Table)
        User newUser = new User();
        newUser.setUserId(request.getUserId());
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword())); // Hash the password
        newUser.setRole(request.getRole()); // Will receive "ROLE_STUDENT" from React
        newUser.setCreatedDate(LocalDate.now());
        newUser.setStatus("ACTIVE");

        // Save the user first so the student table has something to link to
        userRepository.save(newUser);

        // 3. Create and populate the Student Profile (Profile Table)
        Student newStudent = new Student();

        // We use the same ID for studentId to keep things organized
        newStudent.setStudentId(request.getUserId());
        newStudent.setFullName(request.getFullName());
        newStudent.setDateOfBirth(request.getDateOfBirth());
        newStudent.setAddress(request.getAddress());
        // We convert the String "Sinhala" to uppercase so it matches the Enum SINHALA
        newStudent.setMedium(com.rcc.lms.entity.student.Medium.valueOf(request.getMedium().toUpperCase()));
        newStudent.setContactNumber(request.getContactNumber());

        // 4. THE MAGIC LINK: Link the profile to the auth user we just created
        newStudent.setUser(newUser);

        // Save the profile to the database
        studentRepository.save(newStudent);

        return "Student successfully registered!";
    }

    // =========================
    // ADMIN - CREATE GENERIC USER (Keep this if you still need it)
    // =========================
    public String createUserByAdmin(User user) {

        // check duplicate username
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "Username already exists!";
        }

        // encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // set default values
        user.setCreatedDate(LocalDate.now());
        user.setStatus("ACTIVE");

        userRepository.save(user);

        return "User created successfully by admin!";
    }

    // =========================
    // ADMIN - UPDATE USER (UNTOUCHED)
    // =========================
    public String updateUser(String username, User updatedUser) {

        User existingUser = userRepository.findByUsername(username)
                .orElse(null);

        if (existingUser == null) {
            return "User not found!";
        }

        if (updatedUser.getRole() != null)
            existingUser.setRole(updatedUser.getRole());

        if (updatedUser.getSubRole() != null)
            existingUser.setSubRole(updatedUser.getSubRole());

        if (updatedUser.getEmail() != null)
            existingUser.setEmail(updatedUser.getEmail());

        if (updatedUser.getStatus() != null)
            existingUser.setStatus(updatedUser.getStatus());

        userRepository.save(existingUser);

        return "User updated successfully!";
    }

    // =========================
    // ADMIN - DELETE USER (UNTOUCHED)
    // =========================
    public String deleteUser(String username) {

        User user = userRepository.findByUsername(username)
                .orElse(null);

        if (user == null) {
            return "User not found!";
        }

        userRepository.delete(user);

        return "User deleted successfully!";
    }
}