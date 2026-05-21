package com.rcc.lms.repository;

import com.rcc.lms.entity.Sport;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SportRepository extends CrudRepository<Sport, Long> {

    //filter by sport
    List<Sport> findByTypeSport(String typeSport);
}
