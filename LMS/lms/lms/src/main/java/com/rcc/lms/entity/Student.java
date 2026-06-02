package com.rcc.lms.student;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "students")

@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;   // auto generated

    private String fullName;

    private String studentId;   // custom student ID

    private String password;

    private String grade;

    private String studentClass;

    private String medium;

    private String dob;

    private String address;

    private String gardian_name;

    private String gardian_contact;

    private String emergency_contact_name_01;
    private String emergency_contact_name_02;

    private String emergency_contact_contact_01;
    private String emergency_contact_contact_02;

    private String mother_job;

    private String father_job;

    private String donation;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getStudentClass() {
        return studentClass;
    }

    public void setStudentClass(String studentClass) {
        this.studentClass = studentClass;
    }

    public String getMedium() {
        return medium;
    }

    public void setMedium(String medium) {
        this.medium = medium;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGardian_name() {
        return gardian_name;
    }

    public void setGardian_name(String gardian_name) {
        this.gardian_name = gardian_name;
    }

    public String getGardian_contact() {
        return gardian_contact;
    }

    public void setGardian_contact(String gardian_contact) {
        this.gardian_contact = gardian_contact;
    }

    public String getEmergency_contact_name_01() {
        return emergency_contact_name_01;
    }

    public void setEmergency_contact_name_01(String emergency_contact_name_01) {
        this.emergency_contact_name_01 = emergency_contact_name_01;
    }

    public String getEmergency_contact_name_02() {
        return emergency_contact_name_02;
    }

    public void setEmergency_contact_name_02(String emergency_contact_name_02) {
        this.emergency_contact_name_02 = emergency_contact_name_02;
    }

    public String getEmergency_contact_contact_01() {
        return emergency_contact_contact_01;
    }

    public void setEmergency_contact_contact_01(String emergency_contact_contact_01) {
        this.emergency_contact_contact_01 = emergency_contact_contact_01;
    }

    public String getEmergency_contact_contact_02() {
        return emergency_contact_contact_02;
    }

    public void setEmergency_contact_contact_02(String emergency_contact_contact_02) {
        this.emergency_contact_contact_02 = emergency_contact_contact_02;
    }

    public String getMother_job() {
        return mother_job;
    }

    public void setMother_job(String mother_job) {
        this.mother_job = mother_job;
    }

    public String getFather_job() {
        return father_job;
    }

    public void setFather_job(String father_job) {
        this.father_job = father_job;
    }

    public String getDonation() {
        return donation;
    }

    public void setDonation(String donation) {
        this.donation = donation;
    }
}