package com.rcc.lms.controller;

import com.rcc.lms.entity.User;
import com.rcc.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/user")
public class UserTestController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public String addUser() {

        User user = new User();
        user.setUserId("U001");
        user.setUsername("admin");
        user.setPassword("1234");
        user.setRole("Admin");
        user.setEmail("admin@gmail.com");
        user.setCreatedDate(LocalDate.now());
        user.setStatus("ACTIVE");

        userRepository.save(user);

        return "User saved successfully!";
    }
}