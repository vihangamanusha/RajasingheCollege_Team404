package com.rcc.lms.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@CrossOrigin(origins = "*")
@RestController
public class UploadsController {

    @GetMapping("/uploads/{fileName:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String fileName) {
        try {
            // URL decode the file name to handle spaces (%20)
            String decodedFileName = URLDecoder.decode(fileName, StandardCharsets.UTF_8.name());
            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            Path filePath = Paths.get(uploadDir).resolve(decodedFileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
