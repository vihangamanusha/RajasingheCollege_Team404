package com.rcc.lms.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Root controller — equivalent to:
 *   app.get('/', (req, res) => res.send('Rajasinghe College LMS Backend is running'))
 */
@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Rajasinghe College LMS Backend is running";
    }
}
