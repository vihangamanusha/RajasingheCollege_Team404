package com.rcc.lms.controller;

import com.rcc.lms.entity.Document;
import com.rcc.lms.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentController {

    @Autowired
    private DocumentService service;

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
}