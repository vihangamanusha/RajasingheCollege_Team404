package com.rcc.lms.service;

import com.rcc.lms.dto.MarksDTO;
import com.rcc.lms.entity.Marks;
import com.rcc.lms.repository.MarksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarksService {

    @Autowired
    private MarksRepository marksRepository;

    public void saveMarks(List<MarksDTO> dtoList) {

        List<Marks> marksList = dtoList.stream().map(dto -> {
            Marks m = new Marks();
            m.setStudentId(dto.getStudentId());
            m.setSubjectId(dto.getSubjectId());
            m.setTerm(dto.getTerm());
            m.setAssignmentMark(dto.getAssignmentMark());

            return m;
        }).toList();

        marksRepository.saveAll(marksList);
    }
}