package com.rcc.lms.repository;

import com.rcc.lms.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

/**
 * USER REPOSITORY
 * Handles database operations
 */

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByUsername(String username);
}