package com.codora.backend.repository;

import com.codora.backend.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface ModuleRepository extends JpaRepository<Module, Long> {

    // Fetch all modules of a course sorted by orderIndex
    List<Module> findByCourseIdOrderByOrderIndexAsc(Long courseId);

    // This will fetch all modules for a course
    List<Module> findByCourseId(Long courseId);

    Page<Module> findByCourseId(Long courseId, Pageable pageable);

    Page<Module> findByCourseIdAndTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            Long courseId, String title, String description, Pageable pageable);

}
