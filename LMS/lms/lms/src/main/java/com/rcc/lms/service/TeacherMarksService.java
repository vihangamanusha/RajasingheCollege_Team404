package com.rcc.lms.service;

import com.rcc.lms.dto.TeacherMarksDTO;
import com.rcc.lms.entity.TeacherMarks;
import com.rcc.lms.repository.TeacherMarksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TeacherMarksService {

    @Autowired
    private TeacherMarksRepository marksRepository;

    public void saveMarks(List<TeacherMarksDTO> dtoList) {

        List<TeacherMarks> marksList = dtoList.stream().map(dto -> {
            TeacherMarks m = new TeacherMarks();
            m.setStudentId(dto.getStudentId());
            m.setSubjectId(dto.getSubjectId());
            m.setTerm(dto.getTerm());
            m.setAssignmentMark(dto.getAssignmentMark());
            m.setAcademicYear(dto.getAcademicYear());
            m.setExamDate(LocalDate.now());

            return m;
        }).toList();

        marksRepository.saveAll(marksList);
    }
}