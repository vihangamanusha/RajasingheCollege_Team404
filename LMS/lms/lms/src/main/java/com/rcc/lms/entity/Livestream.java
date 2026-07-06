package com.rcc.lms.entity;

import jakarta.persistence.*;

@Entity
@Table(name="livestreams")
public class Livestream {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String date;
    private String time;

    @Column(columnDefinition = "TEXT")
    private String description;
    private String videoURL;

    @Column(name = "is_live")
    private boolean isLive = false;

    public Livestream() {}

    public Livestream(Long id, String title, String date, String time, String description, String videoURL) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.time = time;
        this.description = description;
        this.videoURL = videoURL;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getVideoURL() {
        return videoURL;
    }

    public void setVideoURL(String videoURL) {
        this.videoURL = videoURL;
    }

    public boolean isLive() {
        return isLive;
    }

    public void setLive(boolean live) {
        this.isLive = live;
    }
}
