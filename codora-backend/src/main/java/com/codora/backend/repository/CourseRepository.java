package com.codora.backend.repository;

import com.codora.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {

    // To check for duplicate titles
    boolean existsByTitle(String title);

    Optional<Course> findByTitle(String title);


    Page<Course> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String title, String description, Pageable pageable);
}
