package com.rcc.lms.dto;

public class LoginResponse {

    private String message;
    private String username;
    private String role;
    private String token;

    // Default constructor
    public LoginResponse() {}

    // Constructor with all fields
    public LoginResponse(String message, String username, String role, String token) {
        this.message = message;
        this.username = username;
        this.role = role;
        this.token = token;
    }

    // Getter and Setter for message
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    // Getter and Setter for username
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getter and Setter for role
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // Getter and Setter for token
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}