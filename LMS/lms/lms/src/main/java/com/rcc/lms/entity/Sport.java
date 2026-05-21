package com.rcc.lms.entity;

import jakarta.persistence.*;

@Entity
@Table(name="sports")
public class Sport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String typesport;

    @Column(nullable = false)
    private String topic;

    private String description;
    private String image;

    public Sport(){}

    public Sport(Long id, String typesport, String topic, String description, String image) {
        this.id = id;
        this.typesport = typesport;
        this.topic = topic;
        this.description = description;
        this.image = image;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTypesport() {
        return typesport;
    }

    public void setTypesport(String typesport) {
        this.typesport = typesport;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
