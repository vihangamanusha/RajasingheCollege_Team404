package com.rcc.lms.controller;

import com.rcc.lms.dto.GenerateClassRequest;
import com.rcc.lms.service.ClassManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/classes")
@CrossOrigin
public class ClassManagementController {

    @Autowired
    private ClassManagementService classManagementService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateClasses(
            @RequestBody GenerateClassRequest request
    ) {

        classManagementService.generateClasses(request);

        return ResponseEntity.ok(
                "Classes generated successfully"
        );
    }
}