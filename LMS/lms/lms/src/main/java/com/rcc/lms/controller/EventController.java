package com.rcc.lms.controller;

import com.rcc.lms.entity.Event;
import com.rcc.lms.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    private final EventService service;

    public EventController(EventService service) {
        this.service = service;
    }



    //get all events
    @GetMapping
    public List<Event> getAllEvents() {
        return service.getAllEvents();
    }

    //add events
    @PostMapping
    public Event addEvent(@RequestBody Event event){
        return service.addEvent(event);
    }

    //update event
    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event event){
        return service.updateEvent(id, event);
    }

    //delete event
    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id){
        service.deleteEvent(id);
    }


}
