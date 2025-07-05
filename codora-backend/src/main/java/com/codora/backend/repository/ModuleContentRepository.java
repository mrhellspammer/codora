package com.codora.backend.repository;

import com.codora.backend.model.ModuleContent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ModuleContentRepository extends JpaRepository<ModuleContent, Long> {

    // Fetch content of a module in proper display order
    List<ModuleContent> findByModuleIdOrderByOrderIndexAsc(Long moduleId);

    // This will fetch all content blocks for a given module
    List<ModuleContent> findByModuleId(Long moduleId);
}
