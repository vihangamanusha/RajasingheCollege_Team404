package com.rcc.lms.controller;

import com.rcc.lms.entity.Livestream;
import com.rcc.lms.service.LiveStreamService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livestreams")
@CrossOrigin(origins = "*")
public class LiveStreamController {

    @Autowired
    private LiveStreamService service;

    // GET ALL
    @GetMapping
    public List<Livestream> getAllStreams() {
        return service.getAllStreams();
    }

    // CREATE
    @PostMapping
    public Livestream createStream(
            @RequestBody Livestream stream) {

        return service.createStream(stream);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Livestream updateStream(
            @PathVariable Long id,
            @RequestBody Livestream stream) {

        return service.updateStream(id, stream);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteStream(
            @PathVariable Long id) {

        service.deleteStream(id);
    }

    // START STREAM
    @PutMapping("/{id}/start")
    public Livestream startStream(
            @PathVariable Long id) {

        return service.startStream(id);
    }

    // STOP STREAM
    @PutMapping("/{id}/stop")
    public Livestream stopStream(
            @PathVariable Long id) {

        return service.stopStream(id);
    }
}