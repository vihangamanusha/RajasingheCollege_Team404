package com.rcc.lms.controller;

import com.rcc.lms.dto.TeacherMarksDTO;
import com.rcc.lms.service.TeacherMarksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/marks")
@CrossOrigin
public class TeacherMarksController {

    @Autowired
    private TeacherMarksService marksService;

    @PostMapping("/save")
    public String saveMarks(@RequestBody List<TeacherMarksDTO> marks) {
        marksService.saveMarks(marks);
        return "Marks saved successfully";
    }

    @GetMapping("/class/{classId}/subject/{subjectId}/term/{term}/year/{year}")
    public List<com.rcc.lms.entity.TeacherMarks> getMarks(
            @PathVariable String classId,
            @PathVariable String subjectId,
            @PathVariable String term,
            @PathVariable int year
    ) {
        return marksService.getMarks(classId, subjectId, term, year);
    }
}