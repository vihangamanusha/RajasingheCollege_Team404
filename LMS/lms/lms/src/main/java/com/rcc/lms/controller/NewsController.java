package com.rcc.lms.controller;

import com.rcc.lms.entity.News;
import com.rcc.lms.repository.NewsRepository;
import com.rcc.lms.service.NewsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")//allow react frontend
@RestController
@RequestMapping("api/news")
public class NewsController {

    private NewsService service;

    public NewsController(NewsService newsService) {
        this.service = service;
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

}