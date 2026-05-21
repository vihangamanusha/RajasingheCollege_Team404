package com.rcc.lms.service;

import com.rcc.lms.entity.Sport;
import com.rcc.lms.repository.SportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SportService {
    @Autowired
    private SportRepository repository;

    public List<Sport> getAllSports() {
        return (List<Sport>) repository.findAll();
    }

    public Sport getSportById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Sport> getByType(String typeSport) {
        return repository.findByTypeSport(typeSport);
    }

    public Sport saveSport(Sport sport) {
        return repository.save(sport);
    }

    public Sport updateSport(Long id, Sport updatedSport) {
        return repository.findById(id).map(sport -> {
            sport.setTypesport(updatedSport.getTypesport());
            sport.setTopic(updatedSport.getTopic());
            sport.setImage(updatedSport.getImage());
            sport.setDescription(updatedSport.getDescription());
            return repository.save(sport);
        }).orElse(null);
    }

    public void deleteSport(Long id) {
        repository.deleteById(id);
    }
}
