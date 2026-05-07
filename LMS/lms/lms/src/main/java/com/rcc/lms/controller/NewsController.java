package com.rcc.lms.controller;

import com.rcc.lms.entity.News;
import com.rcc.lms.repository.NewsRepository;
import com.rcc.lms.service.NewsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;

import java.io.File;
import java.util.List;

@CrossOrigin(origins = "*")//allow react frontend
@RestController
@RequestMapping("api/news")
public class NewsController {

    private NewsService service;

    public NewsController(NewsService newsService) {
        this.service = newsService;
    }

    //get all news
    @GetMapping
    public List<News> getAllNews() {
        return service.getALLNews();
    }

    //create news
    @PostMapping
    public News createNews(@RequestBody News news) {
        return service.saveNews(news);
    }

    //update news
    @PutMapping("/{id}")
    public News updateNews(@PathVariable Long id, @RequestBody News news) {
        return service.updateNews(id, news);
    }

    //delete news
    @DeleteMapping("/{id}")
    public void deleteNews(@PathVariable Long id) {
        service.deleteNews(id);
    }
    @GetMapping("/test")
    public String test() {
        return "API Working";
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public News createNews(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("date") String date,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {

        String filename = null;

        try {
            if (image != null && !image.isEmpty()) {

                String uploadDir = "uploads/";

                File dir = new File(uploadDir);
                if (!dir.exists()) {
                    dir.mkdirs();
                }

                filename = System.currentTimeMillis() + "_" + image.getOriginalFilename();

                File saveFile = new File(uploadDir + filename);
                image.transferTo(saveFile);
            }

            News news = new News();
            news.setTitle(title);
            news.setContent(content);
            news.setDate(date);
            news.setImage(filename);

            return service.saveNews(news);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Upload failed: " + e.getMessage());
        }
    }
}