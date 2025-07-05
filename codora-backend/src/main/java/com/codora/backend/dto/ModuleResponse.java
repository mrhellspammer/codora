package com.codora.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModuleResponse {
    private Long id;
    private String title;
    private String description;
    private int orderIndex;
}
