package com.rcc.lms.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseMigration implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        try {
            jdbcTemplate.execute("ALTER TABLE `marks` ADD COLUMN `academic_year` INT NOT NULL DEFAULT 2026");
            System.out.println("Database migration: Added academic_year column to marks table");
        } catch (Exception e) {
            // Ignore if column already exists or any other SQL error
            System.out.println("Database migration academic_year check: " + e.getMessage());
        }

        try {
            jdbcTemplate.execute("ALTER TABLE `marks` ADD COLUMN `exam_date` DATE");
            System.out.println("Database migration: Added exam_date column to marks table");
        } catch (Exception e) {
            // Ignore if column already exists or any other SQL error
            System.out.println("Database migration exam_date check: " + e.getMessage());
        }
    }
}
