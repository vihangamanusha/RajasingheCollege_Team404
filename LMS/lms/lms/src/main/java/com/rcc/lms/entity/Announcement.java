package com.rcc.lms.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "announcements")
public class Announcement {

    // =========================
    // PRIMARY KEY
    // =========================
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "announcement_id")
    private Integer announcementId;

    // =========================
    // TITLE
    // =========================
    @Column(name = "title")
    private String title;

    // =========================
    // CONTENT
    // =========================
    @Column(name = "content")
    private String content;

    // =========================
    // CREATED DATE
    // =========================
    @Column(name = "created_date")
    private LocalDateTime createdDate;

    // =========================
    // DEFAULT CONSTRUCTOR
    // =========================
    public Announcement() {
    }

    // =========================
    // GETTERS & SETTERS
    // =========================
    public Integer getAnnouncementId() {
        return announcementId;
    }

    public void setAnnouncementId(Integer announcementId) {
        this.announcementId = announcementId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}