package com.codora.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;

@Service
public class ModuleContentImageService {

    private final String uploadDir = "uploads/module-content";

    /**
     * Saves an image for a module content block and returns its relative path.
     */
    public String saveContentImage(MultipartFile file) {
        // Make sure uploads/module-content/ exists
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Clean filename and generate target path
        String originalFilename = Path.of(file.getOriginalFilename()).getFileName().toString();
        String uniqueFilename = System.currentTimeMillis() + "_" + originalFilename;
        Path filepath = Paths.get(uploadDir, uniqueFilename);

        try {
            // Save file to disk
            Files.write(filepath, file.getBytes(), StandardOpenOption.CREATE_NEW);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store content image", e);
        }

        // Return the relative URL path (used in frontend)
        return "/images/module-content/" + uniqueFilename;
    }
}
