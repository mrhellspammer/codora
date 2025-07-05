package com.codora.backend.service;

import com.codora.backend.dto.CourseRequest;
import com.codora.backend.dto.ModuleContentRequest;
import com.codora.backend.dto.ModuleRequest;
import com.codora.backend.model.Course;
import com.codora.backend.model.Module;
import com.codora.backend.model.ModuleContent;
import com.codora.backend.repository.CourseRepository;
import com.codora.backend.repository.ModuleContentRepository;
import com.codora.backend.repository.ModuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import java.util.stream.Collectors;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseModuleService {

    private final CourseRepository courseRepository;
    private final ModuleRepository moduleRepository;
    private final ModuleContentRepository contentRepository;

    // Add a new course
    public Course addCourse(CourseRequest request) {
        if (courseRepository.existsByTitle(request.getTitle())) {
            throw new RuntimeException("Course title already exists.");
        }

        Course course = Course.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .build();

        return courseRepository.save(course);
    }

    // Get all available courses (for listing on home screen)
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<Course> getAllCourses(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("title").ascending());

        Page<Course> coursePage;

        if (search != null && !search.trim().isEmpty()) {
            coursePage = courseRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                    search, search, pageable);
        } else {
            coursePage = courseRepository.findAll(pageable);
        }

        return coursePage.getContent();
    }

    // Update a course (title/description)
    public Course updateCourse(Long courseId, CourseRequest request) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found."));

        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());

        return courseRepository.save(course);
    }

    // Delete a course and all its modules + contents
    public void deleteCourse(Long courseId) {
        courseRepository.deleteById(courseId);
    }

    // Add a module to a course
    public Module addModule(ModuleRequest request) {
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found."));

        Module module = Module.builder()
                .title(request.getTitle())
                .orderIndex(request.getOrderIndex())
                .course(course)
                .build();

        return moduleRepository.save(module);
    }

    // Get all modules for a course in proper order
    public List<Module> getModulesByCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        List<Module> modules = course.getModules();
        modules.sort((a, b) -> Integer.compare(a.getOrderIndex(), b.getOrderIndex()));
        return modules;
    }


    // Update a module
    public Module updateModule(Long moduleId, ModuleRequest request) {
        Module module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module not found."));

        module.setTitle(request.getTitle());
        module.setOrderIndex(request.getOrderIndex());

        return moduleRepository.save(module);
    }

    // Delete a module and its contents
    public void deleteModule(Long moduleId) {
        moduleRepository.deleteById(moduleId);
    }

    // Add content block to a module
    public ModuleContent addContent(ModuleContentRequest request) {
        Module module = moduleRepository.findById(request.getModuleId())
                .orElseThrow(() -> new RuntimeException("Module not found."));

        ModuleContent content = ModuleContent.builder()
                .type(request.getType())
                .content(request.getContent())
                .orderIndex(request.getOrderIndex())
                .module(module)
                .build();

        return contentRepository.save(content);
    }

    // Get all content blocks for a module (in display order)
    public List<ModuleContent> getContentsByModule(Long moduleId) {
        Module module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module not found"));

        List<ModuleContent> contents = module.getContents();
        contents.sort((a, b) -> Integer.compare(a.getOrderIndex(), b.getOrderIndex()));
        return contents;
    }


    // Update a specific content block
    public ModuleContent updateContent(Long contentId, ModuleContentRequest request) {
        ModuleContent content = contentRepository.findById(contentId)
                .orElseThrow(() -> new RuntimeException("Content not found."));

        content.setType(request.getType());
        content.setContent(request.getContent());
        content.setOrderIndex(request.getOrderIndex());

        return contentRepository.save(content);
    }

    // Delete a content block
    public void deleteContent(Long contentId) {
        contentRepository.deleteById(contentId);
    }

    // -----------------------------------------

    // Reorder modules by their new order of IDs
    public void reorderModules(Long courseId, List<Long> orderedModuleIds) {
        List<Module> modules = moduleRepository.findByCourseId(courseId);
        if (modules.size() != orderedModuleIds.size()) {
            throw new RuntimeException("Mismatch in module count and order list.");
        }

        for (int i = 0; i < orderedModuleIds.size(); i++) {
            Long moduleId = orderedModuleIds.get(i);
            Module module = modules.stream()
                    .filter(m -> m.getId().equals(moduleId))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Module ID not found: " + moduleId));
            module.setOrderIndex(i);
            moduleRepository.save(module);
        }
    }

    // Reorder content blocks by their new order of IDs
    public void reorderModuleContents(Long moduleId, List<Long> orderedContentIds) {
        List<ModuleContent> contents = contentRepository.findByModuleId(moduleId);
        if (contents.size() != orderedContentIds.size()) {
            throw new RuntimeException("Mismatch in content count and order list.");
        }

        for (int i = 0; i < orderedContentIds.size(); i++) {
            Long contentId = orderedContentIds.get(i);
            ModuleContent content = contents.stream()
                    .filter(c -> c.getId().equals(contentId))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Content ID not found: " + contentId));
            content.setOrderIndex(i);
            contentRepository.save(content);
        }
    }

    public Page<Module> getModulesByCoursePaged(Long courseId, int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("orderIndex"));

        if (search != null && !search.trim().isEmpty()) {
            return moduleRepository.findByCourseIdAndTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                    courseId, search, search, pageable);
        } else {
            return moduleRepository.findByCourseId(courseId, pageable);
        }
    }


}
