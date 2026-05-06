package com.rcc.lms.service;

import com.rcc.lms.entity.News;
import com.rcc.lms.repository.NewsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsService {

    private final NewsRepository newsRepository;

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    //get all news
    public List<News> getALLNews(){
        return newsRepository.findAll();
    }

    //create news
    public News saveNews(News news){
        return newsRepository.save(news);
    }

    
}
