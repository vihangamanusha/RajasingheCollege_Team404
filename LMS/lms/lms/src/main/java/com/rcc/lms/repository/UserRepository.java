package com.rcc.lms.repository;

import com.rcc.lms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByUsername(String username);

    // ========================================================================
    // UNIQUENESS CHECKS (NEW)
    // ========================================================================

    /**
     * Checks if a username already exists in the system.
     */
    boolean existsByUsername(String username);

    /**
     * Checks if an email is already registered.
     */
    boolean existsByEmail(String email);

    /**
     * Checks if a User ID (Student ID) already exists.
     */
    boolean existsByUserId(String userId);

    // ========================================================================
    // CUSTOM SEARCH ENGINE FOR ADMIN DASHBOARD
    // ========================================================================
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.status != 'DELETED' AND " +
            "(LOWER(u.username) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(u.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(u.userId) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<User> searchActiveUsersByRoleAndTerm(@Param("role") String role, @Param("searchTerm") String searchTerm);

    // Fallback: Just get all active users for a specific role when the search bar is empty
    List<User> findByRoleAndStatusNot(String role, String status);

    // ========================================================================
    // DYNAMIC DASHBOARD STATS & ACTIVITY
    // ========================================================================

    /**
     * Used to calculate the real-time count of Students, Teachers, etc.
     */
    long countByRoleAndStatusNot(String role, String status);

    /**
     * Fetches the 4 most recently created users who are not deleted.
     */
    List<User> findTop4ByStatusNotOrderByCreatedDateDesc(String status);
}