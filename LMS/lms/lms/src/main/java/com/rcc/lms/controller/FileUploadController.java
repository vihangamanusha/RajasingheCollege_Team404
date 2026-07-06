package com.rcc.lms.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    private static final String UPLOAD_DIR = "uploads/";

    @Value("${app.base-url:http://localhost:8080}")
    private String baseUrl;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {

        try {

            // CREATE uploads folder if not exists
            String uploadDir = System.getProperty("user.dir") + "/uploads/";

            File dir = new File(uploadDir);

            if (!dir.exists()) {
                dir.mkdirs();
            }

            // CREATE unique filename
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename().replaceAll("\\s+", "_");

            Path filePath = Paths.get(uploadDir, fileName);

            // SAVE FILE
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // RETURN FILENAME (Relative path resolved by front-end)
            return ResponseEntity.ok(fileName);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }
}