package com.codora.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "module_contents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ModuleContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Type of content: heading, subheading, text, code
    @Enumerated(EnumType.STRING)
    private ContentType type;

    // Actual content text (or path for images, later)
    @Column(length = 5000)
    private String content;

    // Order inside the module
    private int orderIndex;

    // Module this content belongs to
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id")
    @JsonIgnore
    private Module module;
}
