package com.rcc.lms.controller;

import com.rcc.lms.entity.NonAcademic;
import com.rcc.lms.repository.NonAcademicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class NonAcademicController {

    @Autowired
    private NonAcademicRepository nonAcademicRepository;

    @GetMapping("/non-academic/all")
    public ResponseEntity<List<NonAcademic>> getAllActiveNonAcademic() {
        try {
            return ResponseEntity.ok(nonAcademicRepository.findByStatus("ACTIVE"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/non-academic/search")
    public ResponseEntity<List<NonAcademic>> searchActiveNonAcademic(@RequestParam String term) {
        try {
            return ResponseEntity.ok(nonAcademicRepository.searchActiveNonAcademic(term));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/non-academic/generate-id")
    public ResponseEntity<String> generateNextId() {
        try {
            List<String> ids = nonAcademicRepository.findNonAcademicIds();
            int maxNum = 0;
            for (String id : ids) {
                try {
                    if (id != null && id.startsWith("na") && id.length() == 6) {
                        String numPart = id.substring(2);
                        int num = Integer.parseInt(numPart);
                        if (num > maxNum) {
                            maxNum = num;
                        }
                    }
                } catch (NumberFormatException e) {
                    // Ignore
                }
            }
            int nextNum = maxNum + 1;
            String nextId = String.format("na%04d", nextNum);
            return ResponseEntity.ok(nextId);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/non-academic/create")
    public ResponseEntity<String> createNonAcademic(@RequestBody NonAcademic nonAcademic) {
        try {
            // Validation
            if (nonAcademic.getFullName() == null || nonAcademic.getFullName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Error: Full Name is required!");
            }
            if (!nonAcademic.getFullName().matches("^[a-zA-Z\\s]+$")) {
                return ResponseEntity.badRequest().body("Error: Full Name can only contain letters and spaces!");
            }
            if (nonAcademic.getContactNumber() == null || !nonAcademic.getContactNumber().matches("^\\d{10}$")) {
                return ResponseEntity.badRequest().body("Error: Contact number must be exactly 10 digits!");
            }
            if (nonAcademic.getNic() == null || !nonAcademic.getNic().matches("^([0-9]{9}[xXvV]|[0-9]{12})$")) {
                return ResponseEntity.badRequest().body("Error: Invalid Sri Lankan NIC format!");
            }
            if (nonAcademic.getEmergencyContact() == null || !nonAcademic.getEmergencyContact().matches("^\\d{10}$")) {
                return ResponseEntity.badRequest().body("Error: Emergency contact number must be exactly 10 digits!");
            }
            if (nonAcademic.getNicFrontUrl() == null || nonAcademic.getNicFrontUrl().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Error: NIC Front image is required!");
            }
            if (nonAcademic.getNicBackUrl() == null || nonAcademic.getNicBackUrl().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Error: NIC Back image is required!");
            }

            nonAcademic.setStatus("ACTIVE");
            nonAcademicRepository.save(nonAcademic);
            return ResponseEntity.ok("Non-academic staff registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/non-academic/update/{id}")
    public ResponseEntity<String> updateNonAcademic(@PathVariable String id, @RequestBody NonAcademic request) {
        try {
            NonAcademic existing = nonAcademicRepository.findById(id).orElse(null);
            if (existing == null) {
                return ResponseEntity.badRequest().body("Error: Non-academic staff member not found!");
            }

            // Validation
            if (request.getFullName() == null || request.getFullName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Error: Full Name is required!");
            }
            if (!request.getFullName().matches("^[a-zA-Z\\s]+$")) {
                return ResponseEntity.badRequest().body("Error: Full Name can only contain letters and spaces!");
            }
            if (request.getContactNumber() == null || !request.getContactNumber().matches("^\\d{10}$")) {
                return ResponseEntity.badRequest().body("Error: Contact number must be exactly 10 digits!");
            }
            if (request.getNic() == null || !request.getNic().matches("^([0-9]{9}[xXvV]|[0-9]{12})$")) {
                return ResponseEntity.badRequest().body("Error: Invalid Sri Lankan NIC format!");
            }
            if (request.getEmergencyContact() == null || !request.getEmergencyContact().matches("^\\d{10}$")) {
                return ResponseEntity.badRequest().body("Error: Emergency contact number must be exactly 10 digits!");
            }
            if (request.getNicFrontUrl() == null || request.getNicFrontUrl().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Error: NIC Front image is required!");
            }
            if (request.getNicBackUrl() == null || request.getNicBackUrl().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Error: NIC Back image is required!");
            }

            existing.setFullName(request.getFullName());
            existing.setEmail(request.getEmail());
            existing.setContactNumber(request.getContactNumber());
            existing.setNic(request.getNic());
            existing.setDesignation(request.getDesignation());
            existing.setEnrollDate(request.getEnrollDate());
            existing.setNicFrontUrl(request.getNicFrontUrl());
            existing.setNicBackUrl(request.getNicBackUrl());
            existing.setEmergencyContact(request.getEmergencyContact());

            nonAcademicRepository.save(existing);
            return ResponseEntity.ok("Non-academic staff profile updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/non-academic/delete/{id}")
    public ResponseEntity<String> deleteNonAcademic(
            @PathVariable String id,
            @RequestParam(required = false, defaultValue = "No reason provided") String reason) {
        try {
            NonAcademic existing = nonAcademicRepository.findById(id).orElse(null);
            if (existing == null) {
                return ResponseEntity.badRequest().body("Error: Non-academic staff member not found!");
            }
            existing.setStatus("DELETED");
            existing.setDeletionNote(reason);
            nonAcademicRepository.save(existing);
            return ResponseEntity.ok("Non-academic staff soft deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}
