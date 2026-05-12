package com.rcc.lms.service;

public class LiveStreamService {
    public String convertToEmbedUrl(String url) {

        if (url == null) return null;

        url = url.trim();

        if (url.contains("watch?v=")) {
            String id = url.split("watch\\?v=")[1].split("&")[0];
            return "https://www.youtube.com/embed/" + id;
        }

        if (url.contains("youtu.be/")) {
            String id = url.split("youtu.be/")[1].split("\\?")[0];
            return "https://www.youtube.com/embed/" + id;
        }

        return url;
    }
}
