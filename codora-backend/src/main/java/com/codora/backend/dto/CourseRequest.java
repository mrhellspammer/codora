package com.codora.backend.dto;

import lombok.Getter;
import lombok.Setter;

// Used when admin adds or updates a course
@Getter
@Setter
public class CourseRequest {
    private String title;
    private String description;
}
