package com.rcc.lms.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.rcc.lms.entity.student.Student;
import com.rcc.lms.entity.student.StudentMarks;
import com.rcc.lms.entity.student.StudentReport;
import org.springframework.stereotype.Service;


import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class StudentReportPdfService {

    @org.springframework.beans.factory.annotation.Autowired
    private com.rcc.lms.repository.StudentRepository studentRepository;

    @org.springframework.beans.factory.annotation.Autowired
    private com.rcc.lms.repository.StudentMarksRepository marksRepository;

    public byte[] generateReportPdf(Student student, StudentReport report, List<StudentMarks> marks) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, out);
            document.open();

            // Font styles
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
            Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 11);

            // Title
            Paragraph title = new Paragraph("Rajasinghe Central College - Progress Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);

            // Student Information
            document.add(new Paragraph("Student ID: " + student.getStudentId(), normalFont));
            document.add(new Paragraph("Student Name: " + student.getFullName(), normalFont));

            if (student.getClassEntity() != null) {
                document.add(new Paragraph("Class: " + student.getClassEntity().getClassName(), normalFont));
            }

            String termVal = "Term 1";
            if (report != null && report.getTerm() != null) {
                termVal = report.getTerm();
            } else if (marks != null && !marks.isEmpty()) {
                termVal = marks.get(0).getTerm();
            }
            document.add(new Paragraph("Term: " + termVal, normalFont));
            document.add(new Paragraph(" ", normalFont));

            // Marks Table
            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10);

            PdfPCell cell1 = new PdfPCell(new Phrase("Subject", headerFont));
            PdfPCell cell2 = new PdfPCell(new Phrase("Marks", headerFont));
            table.addCell(cell1);
            table.addCell(cell2);

            for (StudentMarks m : marks) {
                // Subject name comes from the Subject entity FK
                String subjectName = (m.getSubject() != null && m.getSubject().getSubjectName() != null)
                        ? m.getSubject().getSubjectName() : "Unknown";
                table.addCell(new Phrase(subjectName, normalFont));
                table.addCell(new Phrase(
                        m.getAssignmentMark() != null ? String.valueOf(m.getAssignmentMark()) : "—",
                        normalFont
                ));
            }

            document.add(table);

            // Calculate dynamic rank if not present in report
            String rankStr = "—";
            if (report != null && report.getRankPosition() != null) {
                rankStr = String.valueOf(report.getRankPosition());
            } else if (student.getClassEntity() != null) {
                String classId = student.getClassEntity().getClassId();
                List<Student> classStudents = studentRepository.findByClassEntityClassId(classId);
                
                String term = (report != null && report.getTerm() != null) ? report.getTerm() : "Term 1";
                if (marks != null && !marks.isEmpty()) {
                    term = marks.get(0).getTerm();
                }
                
                java.util.Map<String, Double> studentAverages = new java.util.HashMap<>();
                for (Student s : classStudents) {
                    List<StudentMarks> sMarks = marksRepository.findByStudentStudentId(s.getStudentId());
                    double sum = 0;
                    int count = 0;
                    for (StudentMarks m : sMarks) {
                        if (term.equalsIgnoreCase(m.getTerm()) && m.getAssignmentMark() != null) {
                            sum += m.getAssignmentMark();
                            count++;
                        }
                    }
                    double average = count > 0 ? (sum / count) : -1.0;
                    studentAverages.put(s.getStudentId(), average);
                }
                
                List<java.util.Map.Entry<String, Double>> sortedStudents = studentAverages.entrySet().stream()
                        .filter(entry -> entry.getValue() >= 0)
                        .sorted((e1, e2) -> Double.compare(e2.getValue(), e1.getValue()))
                        .collect(java.util.stream.Collectors.toList());
                        
                int computedRank = -1;
                for (int i = 0; i < sortedStudents.size(); i++) {
                    if (sortedStudents.get(i).getKey().equals(student.getStudentId())) {
                        computedRank = i + 1;
                        break;
                    }
                }
                if (computedRank != -1) {
                    rankStr = String.valueOf(computedRank);
                }
            }

            // Calculate dynamic average and total marks if report is null
            double dynamicAverage = 0.0;
            int dynamicTotal = 0;
            if (marks != null && !marks.isEmpty()) {
                int sum = 0;
                int count = 0;
                for (StudentMarks m : marks) {
                    if (m.getAssignmentMark() != null) {
                        sum += m.getAssignmentMark();
                        count++;
                    }
                }
                dynamicTotal = sum;
                dynamicAverage = count > 0 ? ((double) sum / count) : 0.0;
            }

            document.add(new Paragraph(" ", normalFont));
            int totalMarksVal = (report != null && report.getTotalMarks() != null) ? report.getTotalMarks() : dynamicTotal;
            double avgVal = (report != null && report.getAverage() != null) ? report.getAverage().doubleValue() : dynamicAverage;

            document.add(new Paragraph("Total Marks: " + totalMarksVal, normalFont));
            document.add(new Paragraph(String.format("Average: %.1f%%", avgVal), normalFont));
            document.add(new Paragraph("Class Rank: " + rankStr, normalFont));

            // Signatures block at the bottom
            document.add(new Paragraph(" ", normalFont));
            document.add(new Paragraph(" ", normalFont));

            PdfPTable sigTable = new PdfPTable(2);
            sigTable.setWidthPercentage(100);
            sigTable.setSpacingBefore(40);

            PdfPCell studCell = new PdfPCell(new Phrase("....................................................\nStudent Signature", normalFont));
            studCell.setBorder(Rectangle.NO_BORDER);
            studCell.setHorizontalAlignment(Element.ALIGN_CENTER);

            PdfPCell guardCell = new PdfPCell(new Phrase("....................................................\nGuardian Signature", normalFont));
            guardCell.setBorder(Rectangle.NO_BORDER);
            guardCell.setHorizontalAlignment(Element.ALIGN_CENTER);

            sigTable.addCell(studCell);
            sigTable.addCell(guardCell);

            document.add(sigTable);

            document.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return out.toByteArray();
    }
}