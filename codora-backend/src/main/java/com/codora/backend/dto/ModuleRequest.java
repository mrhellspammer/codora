package com.codora.backend.dto;

import lombok.Getter;
import lombok.Setter;

// Used when adding or updating a module
@Getter
@Setter
public class ModuleRequest {
    private String title;
    private int orderIndex;
    private Long courseId;  // Which course this module belongs to
}
