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

    //updates news
    public News updateNews(Long id,News updatedNews){
        News exisitingNews = newsRepository.findById(id).orElseThrow(()->new RuntimeException("News not found"));
        exisitingNews.setTitle(updatedNews.getTitle());
        exisitingNews.setContent(updatedNews.getContent());
        exisitingNews.setDate(updatedNews.getDate());
        exisitingNews.setImage(updatedNews.getImage());

        return newsRepository.save(exisitingNews);
    }

    //delete news

    public void deleteNews(Long id){
        if(!newsRepository.existsById(id)){
            throw new RuntimeException("News not found");
        }
        newsRepository.deleteById(id);
    }
}
