package com.rcc.lms.service;

import com.rcc.lms.entity.Livestream;
import com.rcc.lms.repository.LiveStreamRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LiveStreamService {

    @Autowired
    private LiveStreamRepository repository;

    // GET ALL STREAMS
    public List<Livestream> getAllStreams() {
        return repository.findAll();
    }

    // CREATE STREAM
    public Livestream createStream(Livestream stream) {

        stream.setVideoURL(
                convertToEmbedUrl(stream.getVideoURL())
        );

        return repository.save(stream);
    }

    // UPDATE STREAM
    public Livestream updateStream(Long id,
                                   Livestream updatedStream) {

        return repository.findById(id)
                .map(stream -> {

                    stream.setTitle(updatedStream.getTitle());
                    stream.setDate(updatedStream.getDate());
                    stream.setTime(updatedStream.getTime());
                    stream.setDescription(updatedStream.getDescription());

                    stream.setVideoURL(
                            convertToEmbedUrl(
                                    updatedStream.getVideoURL()
                            )
                    );

                    return repository.save(stream);

                })
                .orElseThrow(() ->
                        new RuntimeException("Stream not found"));
    }

    // DELETE STREAM
    public void deleteStream(Long id) {
        repository.deleteById(id);
    }

    // START STREAM
    public Livestream startStream(Long id) {

        return repository.findById(id)
                .map(stream -> {

                    stream.setLive(true);

                    return repository.save(stream);

                })
                .orElseThrow(() ->
                        new RuntimeException("Stream not found"));
    }

    // STOP STREAM
    public Livestream stopStream(Long id) {

        return repository.findById(id)
                .map(stream -> {

                    stream.setLive(false);

                    return repository.save(stream);

                })
                .orElseThrow(() ->
                        new RuntimeException("Stream not found"));
    }

    // CONVERT YOUTUBE URL
    public String convertToEmbedUrl(String url) {

        if (url == null) return null;

        url = url.trim();

        // watch?v=
        if (url.contains("watch?v=")) {

            String id = url
                    .split("watch\\?v=")[1]
                    .split("&")[0];

            return "https://www.youtube.com/embed/" + id;
        }

        // youtu.be
        if (url.contains("youtu.be/")) {

            String id = url
                    .split("youtu.be/")[1]
                    .split("\\?")[0];

            return "https://www.youtube.com/embed/" + id;
        }

        return url;
    }
}