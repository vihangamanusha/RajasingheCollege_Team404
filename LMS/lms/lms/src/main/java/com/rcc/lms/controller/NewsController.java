package com.rcc.lms.controller;

import com.rcc.lms.entity.News;
import com.rcc.lms.service.NewsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService service;

    public NewsController(NewsService newsService) {
        this.service = newsService;
    }

    @GetMapping
    public List<News> getAllNews() {
        return service.getALLNews();
    }

    @PostMapping
    public News createNews(@RequestBody News news) {
        return service.saveNews(news);
    }

    @PutMapping("/{id}")
    public News updateNews(@PathVariable Long id,
                           @RequestBody News news) {
        return service.updateNews(id, news);
    }

    @DeleteMapping("/{id}")
    public void deleteNews(@PathVariable Long id) {
        service.deleteNews(id);
    }

    @GetMapping("/test")
    public String test() {
        return "API Working";
    }
}