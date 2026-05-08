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

            // Student Info
            document.add(new Paragraph("Student ID: " + student.getStudentId(), normalFont));
            document.add(new Paragraph("Student Name: " + student.getFullName(), normalFont));
            if (student.getClassEntity() != null) {
                document.add(new Paragraph("Class: " + student.getClassEntity().getClassName(), normalFont));
            }
            document.add(new Paragraph("Term: " + (report != null ? report.getTerm() : "N/A"), normalFont));
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
                table.addCell(new Phrase(m.getSubjectName() != null ? m.getSubjectName() : "Unknown", normalFont));
                table.addCell(new Phrase(String.valueOf(m.getAssignmentMark()), normalFont));
            }

            document.add(table);

            // Summary Info
            if (report != null) {
                document.add(new Paragraph(" ", normalFont));
                document.add(new Paragraph("Attendance: " + report.getAttendancePercentage() + "%", normalFont));
                document.add(new Paragraph("Overall Grade: " + report.getOverallGrade(), normalFont));
                document.add(new Paragraph("Teacher's Comments: " + report.getTeacherComments(), normalFont));
            }

            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return out.toByteArray();
    }
}
