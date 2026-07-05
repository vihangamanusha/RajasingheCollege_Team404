package com.rcc.lms.controller;

import com.rcc.lms.entity.Document;
import com.rcc.lms.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentController {

    @Autowired
    private DocumentService service;

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> download(@PathVariable Long id) throws IOException {

        Document doc = service.getAll()
                .stream()
                .filter(d -> d.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Document not found"));

        Path filePath = Paths.get(doc.getFilePath());
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists()) {
            throw new RuntimeException("File not found on server");
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + doc.getFileName() + "\"")
                .body(resource);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Document upload(
            @RequestParam("topic") String topic,
            @RequestParam("file") MultipartFile file) throws Exception {

        return service.upload(topic, file);
    }

    @GetMapping
    public List<Document> getAll() {
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Document updateDocument(
            @PathVariable Long id,
            @RequestParam("topic") String topic,
            @RequestParam(value = "file", required = false) MultipartFile file) throws Exception {

        return service.updateDocument(id, topic, file);
    }
}