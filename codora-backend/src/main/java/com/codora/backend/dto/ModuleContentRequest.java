package com.codora.backend.dto;

import com.codora.backend.model.ContentType;

import lombok.Getter;
import lombok.Setter;

// Used when creating or updating content blocks
@Getter
@Setter
public class ModuleContentRequest {
    private ContentType type;     // HEADING, TEXT, CODE, IMAGE, etc.
    private String content;       // Actual text or image path
    private int orderIndex;       // Position within the module
    private Long moduleId;        // Belongs to which module
}
