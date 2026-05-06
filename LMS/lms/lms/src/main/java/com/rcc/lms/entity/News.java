package com.rcc.lms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)//column cannot null in db
    @NotBlank//validating before saving
    private String title;

    @Column(nullable=false)
    @NotBlank
    private String content;

    @Column(nullable=false)
    private String date;

    @Column(nullable=false)
    private String image;



}
