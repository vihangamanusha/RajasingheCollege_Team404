package com.rcc.lms.controller;

import com.rcc.lms.entity.Sport;
import com.rcc.lms.service.SportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sports")
@CrossOrigin(origins = "*")
public class SportController {

    @Autowired
    private SportService service;

    @GetMapping
    public List<Sport> getAll() {
        return service.getAllSports();
    }

    @GetMapping("/{id}")
    public Sport getById(@PathVariable Long id) {
        return service.getSportById(id);
    }

    @GetMapping("/type/{type}")
    public List<Sport> getByType(@PathVariable String type) {
        return service.getByType(type);
    }

    @PostMapping
    public Sport create(@RequestBody Sport sport) {
        return service.saveSport(sport);
    }

    @PutMapping("/{id}")
    public Sport update(@PathVariable Long id, @RequestBody Sport sport) {
        return service.updateSport(id, sport);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteSport(id);
    }
}