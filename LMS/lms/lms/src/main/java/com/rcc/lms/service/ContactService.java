package com.rcc.lms.service;

import com.rcc.lms.entity.ContactMessage;
import com.rcc.lms.repository.ContactRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactRepository repo;

    public ContactService(ContactRepository repo) {
        this.repo = repo;
    }

    public ContactMessage save(ContactMessage msg) {
        return repo.save(msg);
    }

    public List<ContactMessage> getAll() {
        return repo.findAll();
    }
}