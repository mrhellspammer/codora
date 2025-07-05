package com.codora.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "modules")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Module {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Module title (e.g., "Introduction")
    @Column(nullable = false)
    private String title;

    // Module description (e.g., overview of what this module covers)
    @Column(length = 2000)
    private String description;

    // Display order within the course
    private int orderIndex;

    // Course to which this module belongs
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    // List of content blocks in this module
    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ModuleContent> contents;
}
