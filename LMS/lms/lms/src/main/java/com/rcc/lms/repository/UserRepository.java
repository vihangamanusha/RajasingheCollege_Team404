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
    // CUSTOM SEARCH ENGINE FOR ADMIN DASHBOARD
    // 1. Checks that the user matches the requested tab (Student, Teacher, Tech)
    // 2. Ensures we do NOT return 'DELETED' users
    // 3. Searches the term inside the Username, Email, OR UserID
    // ========================================================================
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.status != 'DELETED' AND " +
            "(LOWER(u.username) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(u.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(u.userId) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<User> searchActiveUsersByRoleAndTerm(@Param("role") String role, @Param("searchTerm") String searchTerm);

    // Fallback: Just get all active users for a specific role when the search bar is empty
    List<User> findByRoleAndStatusNot(String role, String status);

    // ========================================================================
    // NEW: DYNAMIC DASHBOARD STATS & ACTIVITY
    // ========================================================================

    /**
     * Used to calculate the real-time count of Students, Teachers, etc.
     * It counts users by their role but ignores anyone marked as 'DELETED'.
     */
    long countByRoleAndStatusNot(String role, String status);

    /**
     * Fetches the 4 most recently created users who are not deleted.
     * This powers the "Recent Activity" feed so it's always up-to-date.
     */
    List<User> findTop4ByStatusNotOrderByCreatedDateDesc(String status);
}