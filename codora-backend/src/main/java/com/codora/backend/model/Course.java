package com.codora.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "courses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Course title like "Java Basics"
    @Column(nullable = false, unique = true)
    private String title;

    // Short description of the course
    @Column(length = 1000)
    private String description;

    // Cloudinary image URL (replacing local imagePath)
    @Column(name = "image_url")
    private String imageUrl;

    // List of modules under this course
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Module> modules;
}
