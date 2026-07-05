package com.rcc.lms.controller;

import com.rcc.lms.entity.Teacher;
import com.rcc.lms.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/students/teachers")
@CrossOrigin(origins = "http://localhost:5173") // React frontend
public class TeacherController {

    @Autowired
    private TeacherRepository teacherRepository;

    @GetMapping
    public List<Map<String, Object>> getAllTeachers() {

        return teacherRepository.findAll()
                .stream()
                .map(t -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("teacherId", t.getTeacherId());
                    map.put("fullName", t.getFullName());
                    map.put("subjectSpecialization", t.getSubjectSpecialization());
                    map.put("subRole", t.getSubRole());
                    map.put("contactNumber", t.getContactNumber());
                    return map;
                })
                .toList();
    }


}