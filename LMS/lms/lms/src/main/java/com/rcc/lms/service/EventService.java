package com.rcc.lms.service;

import com.rcc.lms.entity.Event;
import com.rcc.lms.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    private final EventRepository repository;

    public EventService(EventRepository repository) {
        this.repository = repository;
    }

    //get all events
    public List<Event> getAllEvents() {
        return repository.findAll();
    }

    //add events
    public Event addEvent(Event event){
        return repository.save(event);
    }

    //update events
    public Event updateEvent(Long id, Event updatedEvent) {

        Event event = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        event.setTopic(updatedEvent.getTopic());
        event.setDescription(updatedEvent.getDescription());
        event.setDate(updatedEvent.getDate());
        event.setTime(updatedEvent.getTime());
        event.setVenue(updatedEvent.getVenue());

        return repository.save(event);
    }

    //delet event
    public void  deleteEvent(Long id){
        repository.deleteById(id);
    }

}
