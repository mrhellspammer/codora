//package com.codora.backend.service;
//
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.nio.file.*;
//
//@Service
//public class CourseImageService {
//
//    // This is the root folder where images will be saved
//    private static final String UPLOAD_DIR = "uploads/courses";
//
//    /**
//     * Handles saving the image file to the uploads folder
//     * Returns the relative image path to be stored in the database
//     */
//    public String saveCourseImage(MultipartFile file, String courseTitle) {
//        try {
//            // Make sure the folder exists
//            Path uploadPath = Paths.get(UPLOAD_DIR);
//            if (!Files.exists(uploadPath)) {
//                Files.createDirectories(uploadPath);
//            }
//
//            // Generate clean filename: courseTitle_with_no_spaces.extension
//            String originalFilename = file.getOriginalFilename();
//            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
//            String sanitizedTitle = courseTitle.toLowerCase().replaceAll("[^a-z0-9]", "_");
//            String filename = sanitizedTitle + extension;
//
//            // Target file location
//            Path filePath = uploadPath.resolve(filename);
//            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
//
//            // Return relative path for image access
//            return "/uploads/courses/" + filename;
//
//        } catch (IOException e) {
//            throw new RuntimeException("Failed to save image file: " + e.getMessage());
//        }
//    }
//}
