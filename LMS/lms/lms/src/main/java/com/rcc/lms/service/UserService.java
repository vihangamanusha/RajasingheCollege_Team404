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
import com.rcc.lms.dto.DashboardStatsDTO;
import com.rcc.lms.dto.RecentActivityDTO;
import com.rcc.lms.security.JwtUtil;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service//This class contains business logic
public class UserService {

    @Autowired//inject dependencies
    private UserRepository userRepository;//handle user table

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private TechnicalOfficerRepository technicalOfficerRepository;

    @Autowired
    private com.rcc.lms.repository.ClassRepository classRepository;

    @Autowired
    private com.rcc.lms.repository.SubjectRepository subjectRepository;

    @Autowired
    private com.rcc.lms.repository.CurriculumSubjectRepository curriculumSubjectRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;//used to encrypt password

    @Autowired
    private JwtUtil jwtUtil;//used to generate token

    private static final List<String> UNIQUE_LEADERSHIP_ROLES = List.of(
        "Class Teacher",
        "Section Head Grade 6",
        "Section Head Grade 7",
        "Section Head Grade 8",
        "Section Head Grade 9",
        "Section Head Grade 10",
        "Section Head Grade 11",
        "Deputy Principal 1",
        "Deputy Principal",
        "Deputy Principal (Administrative)",
        "Deputy Principal (Development)",
        "Vice Principal"
    );

    // =========================
    // LOGIN USER
    // =========================
    public LoginResponse loginUser(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())//find by username
                .orElse(null);

        if (user == null || "DELETED".equals(user.getStatus())) {//check user exit or active
            throw new RuntimeException("Invalid username or password");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {//check password
            throw new RuntimeException("Invalid username or password");
        }

        //crete login token
        String token = jwtUtil.generateToken(user.getUsername());

        return new LoginResponse(
                "Login successful",
                user.getUsername(),
                user.getRole(),
                token,
                user.getSubRole()
        );
    }

    // ==============================================================
    // DYNAMIC DASHBOARD LOGIC
    // ==============================================================

    public DashboardStatsDTO getAdminDashboardStats() {
        DashboardStatsDTO stats = new DashboardStatsDTO();
        long totalStudents = studentRepository.findAll().stream()
                .filter(s -> s.getUser() != null && !"DELETED".equals(s.getUser().getStatus()))
                .count();
        long totalTeachers = teacherRepository.findAll().stream()
                .filter(t -> t.getUser() != null && !"DELETED".equals(t.getUser().getStatus()))
                .count();

        stats.setTotalStudents(totalStudents);
        stats.setTotalTeachers(totalTeachers);
        stats.setTotalClasses((int) classRepository.count());
        
        stats.setTotalSubjects((int) curriculumSubjectRepository.countByStatus("ACTIVE"));

        List<RecentActivityDTO> activityList = userRepository.findTop5ByStatusNotOrderByCreatedDateDescUserIdDesc("DELETED")
                .stream()
                .map(u -> new RecentActivityDTO(
                        u.getUsername(),
                        "was registered as a " + u.getRole().replace("ROLE_", "").toLowerCase(),
                        "Recently",
                        u.getUsername().substring(0, 1).toUpperCase()
                ))
                .collect(Collectors.toList());//transwer user objectto the dto object

        stats.setRecentActivities(activityList);
        return stats;
    }

    // ==============================================================
    // REGISTER USER WIZARDS WITH UNIQUENESS CHECKS
    // ==============================================================

    @Transactional//connect with the two tables, (multiple tables)
    public String registerNewStudent(StudentRegistrationRequest request) {
        // 1. Uniqueness Checks
        if (userRepository.existsByUserId(request.getUserId())) {
            return "Error: Student ID already exists!";
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            return "Error: Username already exists!";
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            return "Error: Email is already registered!";
        }

        // 2. Create Auth User
        User newUser = new User();
        newUser.setUserId(request.getUserId());
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setRole(request.getRole());
        newUser.setCreatedDate(LocalDate.now());
        newUser.setStatus("ACTIVE");
        userRepository.save(newUser);

        // 3. Create Student Profile
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

    @Transactional//connect with the two tables, (multiple tables)
    public String registerNewTeacher(TeacherRegistrationRequest request) {
        // 1. Check for existing IDs/Users to prevent duplicates
        if (userRepository.existsByUserId(request.getUserId())) {
            return "Error: Teacher ID already exists!";
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            return "Error: Username already exists!";
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            return "Error: Email is already registered!";
        }
        if (teacherRepository.existsByNic(request.getNic())) {
            return "Error: NIC is already registered!";
        }
        if (request.getSubRole() != null && UNIQUE_LEADERSHIP_ROLES.contains(request.getSubRole())) {
            if (userRepository.existsBySubRoleAndStatusNot(request.getSubRole(), "DELETED")) {
                return "Error: The designation '" + request.getSubRole() + "' is already occupied!";
            }
        }

        // 2. Create the Auth User (Security Credentials)
        User newUser = new User();
        newUser.setUserId(request.getUserId());
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setRole("ROLE_TEACHER");
        newUser.setSubRole(request.getSubRole()); // Saves designation to User table
        newUser.setCreatedDate(LocalDate.now());//set the current date.
        newUser.setStatus("ACTIVE");
        userRepository.save(newUser);

        // 3. Create the Teacher Profile (Professional Details)
        Teacher newTeacher = new Teacher();
        newTeacher.setTeacherId(request.getUserId());
        newTeacher.setFullName(request.getFullName());
        newTeacher.setSubjectSpecialization(request.getSubjectSpecialization()); // Comma-separated string from frontend
        newTeacher.setSubRole(request.getSubRole()); // Saves designation to Teacher table
        newTeacher.setContactNumber(request.getContactNumber());
        newTeacher.setNic(request.getNic());
        newTeacher.setUser(newUser);
        teacherRepository.save(newTeacher);

        return "Teacher successfully registered!";
    }

    @Transactional
    public String registerNewTechOfficer(TechRegistrationRequest request) {
        // 1. Uniqueness Checks
        if (userRepository.existsByUserId(request.getUserId())) {
            return "Error: Technical Officer ID already exists!";
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            return "Error: Username already exists!";
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            return "Error: Email is already registered!";
        }
        if (technicalOfficerRepository.existsByNic(request.getNic())) {
            return "Error: NIC is already registered!";
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
        newTech.setNic(request.getNic());
        newTech.setUser(newUser);
        technicalOfficerRepository.save(newTech);

        return "Technical Officer successfully registered!";
    }

    // ==============================================================
    // SEARCH, PROFILE UPDATES & ADMIN ACTIONS (Remain the same)
    // ==============================================================

    public java.util.List<User> searchUsers(String role, String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {//IF SEARCH EMPTY
            return userRepository.findByRoleAndStatusNot(role, "DELETED");//Return ALL active users for that role
        }
        return userRepository.searchActiveUsersByRoleAndTerm(role, searchTerm);
    }

    public Student getStudentProfile(String username) {//get student profile by username
        User user = userRepository.findByUsername(username).orElse(null);
        if (user != null) {//find student profile by id
            return studentRepository.findById(user.getUserId()).orElse(null);//retun student object
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
        userRepository.save(existingUser);//Updates database.

        Student existingStudent = studentRepository.findById(existingUser.getUserId()).orElse(null);
        if (existingStudent != null) {
            existingStudent.setFullName(request.getFullName());
            existingStudent.setDateOfBirth(request.getDateOfBirth());
            existingStudent.setAddress(request.getAddress());
            existingStudent.setContactNumber(request.getContactNumber());
            if (request.getMedium() != null) {
                existingStudent.setMedium(com.rcc.lms.entity.student.Medium.valueOf(request.getMedium()));
            }
            studentRepository.save(existingStudent);//update databse
        }
        return "Student profile updated successfully!";
    }

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

        if (request.getSubRole() != null && UNIQUE_LEADERSHIP_ROLES.contains(request.getSubRole())) {
            if (userRepository.existsBySubRoleAndUserIdNotAndStatusNot(request.getSubRole(), existingUser.getUserId(), "DELETED")) {
                return "Error: The designation '" + request.getSubRole() + "' is already occupied!";
            }
        }

        if (request.getEmail() != null) existingUser.setEmail(request.getEmail());
        if (request.getSubRole() != null) existingUser.setSubRole(request.getSubRole());
        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        userRepository.save(existingUser);

        Teacher existingTeacher = teacherRepository.findById(existingUser.getUserId()).orElse(null);
        if (existingTeacher != null) {
            existingTeacher.setFullName(request.getFullName());
            existingTeacher.setSubjectSpecialization(request.getSubjectSpecialization());
            existingTeacher.setContactNumber(request.getContactNumber());
            if (request.getSubRole() != null) {
                existingTeacher.setSubRole(request.getSubRole());
            }
            teacherRepository.save(existingTeacher);
        }
        return "Teacher profile updated successfully!";
    }

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
        if (request.getEmail() != null) existingUser.setEmail(request.getEmail());
        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        userRepository.save(existingUser);

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

    @Transactional//connect with multiple table
    public String softDeleteUser(String username, String deletionNote) {
        User existingUser = userRepository.findByUsername(username).orElse(null);
        if (existingUser == null) return "User not found!";
        existingUser.setStatus("DELETED");
        existingUser.setDeletionNote(deletionNote);
        userRepository.save(existingUser);
        return "User soft deleted successfully!";
    }

    public String createUserByAdmin(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "Username already exists!";
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedDate(LocalDate.now());
        user.setStatus("ACTIVE");
        userRepository.save(user);//insert into database
        return "User created successfully by admin!";
    }

    public String deleteUser(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) return "User not found!";
        user.setStatus("DELETED");
        userRepository.save(user);
        return "User soft deleted successfully!";
    }

    public String generateNextUserId(String role) {
        String prefix;
        int padding = 3;
        if ("ROLE_STUDENT".equals(role)) {
            prefix = "STU";
        } else if ("ROLE_TEACHER".equals(role)) {
            prefix = "teacher";
            padding = 4;
        } else if ("ROLE_TECHNICAL_OFFICER".equals(role) || "ROLE_TECH_OFFICER".equals(role)) {
            prefix = "to";
            padding = 4;
        } else {
            prefix = "USR";
        }

        List<String> userIds = userRepository.findUserIdsByPrefix(prefix);

        int maxNum = 0;
        int expectedLength = prefix.length() + padding;
        for (String id : userIds) {
            try {
                if (id != null && id.length() == expectedLength) {
                    String numPart = id.substring(prefix.length());
                    int num = Integer.parseInt(numPart.trim());
                    if (num > maxNum) {
                        maxNum = num;
                    }
                }
            } catch (NumberFormatException e) {
                // Ignore malformed IDs
            }
        }

        int nextNum = maxNum + 1;
        return String.format("%s%0" + padding + "d", prefix, nextNum);
    }

    public List<String> getOccupiedDesignations() {
        return userRepository.findOccupiedSubRoles(UNIQUE_LEADERSHIP_ROLES, "DELETED");
    }

    public String changePassword(String username, String newPassword) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) return "User not found!";
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return "Password changed successfully!";
    }
}