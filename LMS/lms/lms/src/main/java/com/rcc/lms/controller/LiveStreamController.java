package com.rcc.lms.controller;

import com.rcc.lms.entity.Livestream;
import com.rcc.lms.repository.LiveStreamRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livestreams")
@CrossOrigin(origins = "*")
public class LiveStreamController {
    private final LiveStreamRepository repository;

    public LiveStreamController(LiveStreamRepository repository) {
        this.repository = repository;
    }

    //  all livestreams
    @GetMapping
    public List<Livestream> getAllStreams() {
        return repository.findAll();
    }

    // Add livestream
    @PostMapping
    public Livestream createStream(@RequestBody Livestream stream) {
        return repository.save(stream);
    }

    // Update livestream
    @PutMapping("/{id}")
    public Livestream updateStream(@PathVariable Long id,
                                   @RequestBody Livestream updatedStream) {

        return repository.findById(id)
                .map(stream -> {
                    stream.setTitle(updatedStream.getTitle());
                    stream.setDate(updatedStream.getDate());
                    stream.setTime(updatedStream.getTime());
                    stream.setDescription(updatedStream.getDescription());
                    stream.setVideoURL(updatedStream.getVideoURL());

                    return repository.save(stream);
                })
                .orElseThrow(() -> new RuntimeException("Stream not found"));
    }

    // deelee livestream
    @DeleteMapping("/{id}")
    public void deleteStream(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
