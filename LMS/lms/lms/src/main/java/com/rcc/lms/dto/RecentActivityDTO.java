package com.rcc.lms.dto;

public class RecentActivityDTO {
    private String name;
    private String action;
    private String timeAgo;
    private String initial;

    public RecentActivityDTO(String name, String action, String timeAgo, String initial) {
        this.name = name;
        this.action = action;
        this.timeAgo = timeAgo;
        this.initial = initial;
    }

    // Getters
    public String getName() { return name; }
    public String getAction() { return action; }
    public String getTimeAgo() { return timeAgo; }
    public String getInitial() { return initial; }
}