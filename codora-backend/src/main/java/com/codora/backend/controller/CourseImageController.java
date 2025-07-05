package com.codora.backend.controller;

import com.codora.backend.model.Course;
import com.codora.backend.repository.CourseRepository;
import com.codora.backend.service.CourseImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseImageController {

    private final CourseImageService imageService;
    private final CourseRepository courseRepository;

    /**
     * Uploads an image for the course with given ID.
     * Saves the image and updates the course's imagePath field.
     */
    @PostMapping("/{courseId}/upload-image")
    public ResponseEntity<String> uploadCourseImage(@PathVariable Long courseId,
                                                    @RequestParam("file") MultipartFile file) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // Save the image and get the relative path
        String imagePath = imageService.saveCourseImage(file, course.getTitle());

        // Update the course entity with image path
        course.setImagePath(imagePath);
        courseRepository.save(course);

        return ResponseEntity.ok("Image uploaded successfully!");
    }
}
