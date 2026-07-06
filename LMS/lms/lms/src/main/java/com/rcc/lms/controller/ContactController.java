package com.rcc.lms.controller;

import com.rcc.lms.entity.ContactMessage;
import com.rcc.lms.service.ContactService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    // SAVE MESSAGE
    @PostMapping
    public ContactMessage sendMessage(@RequestBody ContactMessage msg) {
        return service.save(msg);
    }

    // GET ALL (optional admin use)
    @GetMapping
    public List<ContactMessage> getMessages() {
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public void deleteMessage(@PathVariable Long id) {
        service.deleteById(id);
    }
}