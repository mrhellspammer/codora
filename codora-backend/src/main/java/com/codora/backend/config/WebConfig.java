package com.codora.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * This maps local /uploads/courses to /images/courses/
     * and /uploads/module-content to /images/module-content/
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Expose course images
        Path courseUploadDir = Paths.get("uploads/courses");
        String coursePath = courseUploadDir.toFile().getAbsolutePath();

        registry.addResourceHandler("/uploads/courses/**")
                .addResourceLocations("file:" + coursePath + "/");

        // Expose module content images
        Path contentUploadDir = Paths.get("uploads/module-content");
        String contentPath = contentUploadDir.toFile().getAbsolutePath();

        registry.addResourceHandler("/images/module-content/**")
                .addResourceLocations("file:" + contentPath + "/");
    }
}
