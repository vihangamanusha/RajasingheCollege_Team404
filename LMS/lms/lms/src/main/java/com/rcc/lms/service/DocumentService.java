package com.rcc.lms.service;

import com.rcc.lms.entity.Document;
import com.rcc.lms.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository repository;

    private final String uploadDir = "uploads/";

    public Document upload(String topic, MultipartFile file) throws Exception {

        Files.createDirectories(Paths.get(uploadDir));

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        Path path = Paths.get(uploadDir, fileName);

        Files.write(path, file.getBytes());

        Document document = new Document();

        document.setTopic(topic);
        document.setFileName(fileName);
        document.setFilePath(path.toString());

        return repository.save(document);
    }

    public List<Document> getAll() {
        return repository.findAll();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}