package com.codora.backend.controller;

import com.codora.backend.dto.CourseRequest;
import com.codora.backend.dto.CourseResponseDTO;
import com.codora.backend.dto.ModuleContentRequest;
import com.codora.backend.dto.ModuleRequest;
import com.codora.backend.dto.ModuleResponse;
import com.codora.backend.model.Course;
import com.codora.backend.model.Module;
import com.codora.backend.model.ModuleContent;
import com.codora.backend.repository.CourseRepository;
import com.codora.backend.service.CourseImageService;
import com.codora.backend.service.CourseModuleService;
import com.codora.backend.service.ModuleContentImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseModuleController {

    private final CourseModuleService courseService;
    private final CourseRepository courseRepository;
    private final CourseImageService imageService;
    private final ModuleContentImageService moduleContentImageService;

    // =================== COURSES ===================

    @PostMapping("/add")
    public ResponseEntity<Course> addCourse(@RequestParam("title") String title,
                                            @RequestParam("description") String description,
                                            @RequestParam(value = "image", required = false) MultipartFile imageFile) {
        Course course = new Course();
        course.setTitle(title);
        course.setDescription(description);

        if (imageFile != null && !imageFile.isEmpty()) {
            String imagePath = imageService.saveCourseImage(imageFile, title);
            course.setImagePath(imagePath);
        }

        Course saved = courseRepository.save(course);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/all")
    public ResponseEntity<List<CourseResponseDTO>> getAllCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search
    ) {
        List<Course> courses = courseRepository.findAll();
        List<CourseResponseDTO> response = courses.stream()
                .map(course -> new CourseResponseDTO(
                        course.getId(),
                        course.getTitle(),
                        course.getDescription(),
                        course.getImagePath()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long courseId,
                                               @RequestBody CourseRequest request) {
        return ResponseEntity.ok(courseService.updateCourse(courseId, request));
    }

    @PutMapping("/{courseId}/update-with-image")
    public ResponseEntity<Course> updateCourseWithImage(
            @PathVariable Long courseId,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        course.setTitle(title);
        course.setDescription(description);

        if (imageFile != null && !imageFile.isEmpty()) {
            String imagePath = imageService.saveCourseImage(imageFile, title);
            course.setImagePath(imagePath);
        }

        Course updated = courseRepository.save(course);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long courseId) {
        courseService.deleteCourse(courseId);
        return ResponseEntity.ok("Course deleted.");
    }

    // =================== MODULES ===================

    @PostMapping("/modules/add")
    public ResponseEntity<Module> addModule(@RequestBody ModuleRequest request) {
        return ResponseEntity.ok(courseService.addModule(request));
    }

    @GetMapping("/{courseId}/modules")
    public ResponseEntity<List<ModuleResponse>> getModulesByCourse(@PathVariable Long courseId) {
        List<Module> modules = courseService.getModulesByCourse(courseId);

        List<ModuleResponse> response = modules.stream()
                .map(m -> new ModuleResponse(
                        m.getId(),
                        m.getTitle(),
                        m.getDescription(),
                        m.getOrderIndex()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{courseId}/modules/page")
    public ResponseEntity<?> getModulesByCoursePaged(
            @PathVariable Long courseId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search
    ) {
        return ResponseEntity.ok(courseService.getModulesByCoursePaged(courseId, page, size, search));
    }

    @PutMapping("/modules/{moduleId}")
    public ResponseEntity<Module> updateModule(@PathVariable Long moduleId,
                                               @RequestBody ModuleRequest request) {
        return ResponseEntity.ok(courseService.updateModule(moduleId, request));
    }

    @PutMapping("/{courseId}/modules/reorder")
    public ResponseEntity<?> reorderModules(@PathVariable Long courseId,
                                            @RequestBody List<Long> orderedModuleIds) {
        courseService.reorderModules(courseId, orderedModuleIds);
        return ResponseEntity.ok("Module order updated.");
    }

    @DeleteMapping("/modules/{moduleId}")
    public ResponseEntity<?> deleteModule(@PathVariable Long moduleId) {
        courseService.deleteModule(moduleId);
        return ResponseEntity.ok("Module deleted.");
    }

    // =================== CONTENT ===================

    @PostMapping("/contents/add")
    public ResponseEntity<ModuleContent> addContent(@RequestBody ModuleContentRequest request) {
        return ResponseEntity.ok(courseService.addContent(request));
    }

    @PostMapping("/module-content/upload-image")
    public ResponseEntity<String> uploadModuleContentImage(@RequestParam("image") MultipartFile imageFile) {
        if (imageFile == null || imageFile.isEmpty()) {
            return ResponseEntity.badRequest().body("No file provided");
        }

        String imagePath = moduleContentImageService.saveContentImage(imageFile);
        return ResponseEntity.ok(imagePath);
    }

    @GetMapping("/modules/{moduleId}/contents")
    public ResponseEntity<List<ModuleContent>> getContentsByModule(@PathVariable Long moduleId) {
        return ResponseEntity.ok(courseService.getContentsByModule(moduleId));
    }

    @PutMapping("/contents/{contentId}")
    public ResponseEntity<ModuleContent> updateContent(@PathVariable Long contentId,
                                                       @RequestBody ModuleContentRequest request) {
        return ResponseEntity.ok(courseService.updateContent(contentId, request));
    }

    @PutMapping("/modules/{moduleId}/contents/reorder")
    public ResponseEntity<?> reorderModuleContents(@PathVariable Long moduleId,
                                                   @RequestBody List<Long> orderedContentIds) {
        courseService.reorderModuleContents(moduleId, orderedContentIds);
        return ResponseEntity.ok("Content block order updated.");
    }

    @DeleteMapping("/contents/{contentId}")
    public ResponseEntity<?> deleteContent(@PathVariable Long contentId) {
        courseService.deleteContent(contentId);
        return ResponseEntity.ok("Content deleted.");
    }
}
