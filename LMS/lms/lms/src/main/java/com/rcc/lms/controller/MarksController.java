package com.rcc.lms.controller;

import com.rcc.lms.dto.MarksDTO;
import com.rcc.lms.service.MarksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/marks")
@CrossOrigin
public class MarksController {

    @Autowired
    private MarksService marksService;

    @PostMapping("/save")
    public String saveMarks(@RequestBody List<MarksDTO> marks) {
        marksService.saveMarks(marks);
        return "Marks saved successfully";
    }
}