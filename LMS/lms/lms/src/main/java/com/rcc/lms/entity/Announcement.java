package com.rcc.lms.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
<<<<<<< HEAD
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
=======
@Table(name="announcements")
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String category;

    private String targetAudience;
    private String content;
    private LocalDateTime createdAt;

    public Announcement() {
        this.createdAt = LocalDateTime.now();

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
>>>>>>> TG1388
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

<<<<<<< HEAD
=======
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTargetAudience() {
        return targetAudience;
    }

    public void setTargetAudience(String targetAudience) {
        this.targetAudience = targetAudience;
    }

>>>>>>> TG1388
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

<<<<<<< HEAD
    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}
=======
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
>>>>>>> TG1388
