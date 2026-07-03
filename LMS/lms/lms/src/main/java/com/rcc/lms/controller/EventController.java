package com.rcc.lms.controller;

import com.rcc.lms.entity.Announcement;
import com.rcc.lms.entity.Event;
import com.rcc.lms.repository.AnnouncementRepository;
import com.rcc.lms.repository.EventRepository;
import com.rcc.lms.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    private final EventService service;

    /*new*/
    @Autowired
    private AnnouncementRepository announcementRepository;
    @Autowired
    private EventRepository eventRepository;

    public EventController(EventService service) {
        this.service = service;
    }



    //get all events
    @GetMapping
    public List<Event> getAllEvents() {
        return service.getAllEvents();
    }

    //add events
    /*@PostMapping
    public Event addEvent(@RequestBody Event event){
        return service.addEvent(event);
    }*/

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


    @PostMapping
    public Event addEvent(@RequestBody Event event) {

        Event savedEvent = eventRepository.save(event);

        // CREATE ANNOUNCEMENT
        if(event.getAnnouncementAudience() != null &&
                !event.getAnnouncementAudience().isEmpty()) {

            Announcement announcement = new Announcement();

            announcement.setTitle(event.getTopic());

            announcement.setContent(
                    event.getDescription()
                            + "\nDate: " + event.getDate()
                            + "\nTime: " + event.getTime()
                            + "\nVenue: " + event.getVenue()
            );

            announcement.setCreatedDate(java.time.LocalDateTime.now());

            announcementRepository.save(announcement);
        }

        return savedEvent;
    }

}
