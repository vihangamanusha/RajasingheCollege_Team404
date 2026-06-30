package com.rcc.lms.repository;

import com.rcc.lms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {//entity and primary key type

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
    // search user by username,email,userid
    //lower-make serch case sensitive
    //Select a User entity and call it u..u- alias..
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.status != 'DELETED' AND " +
            "(LOWER(u.username) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(u.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(u.userId) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(u.subRole) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<User> searchActiveUsersByRoleAndTerm(@Param("role") String role, @Param("searchTerm") String searchTerm);//Maps method inputs to query variables.


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
     * Fetches the 5 most recently created users who are not deleted, ordered by created date and then user ID descending.
     */
    List<User> findTop5ByStatusNotOrderByCreatedDateDescUserIdDesc(String status);

    @Query("SELECT u.userId FROM User u WHERE u.userId LIKE CONCAT(:prefix, '%')")
    List<String> findUserIdsByPrefix(@Param("prefix") String prefix);

    boolean existsBySubRoleAndStatusNot(String subRole, String status);

    boolean existsBySubRoleAndUserIdNotAndStatusNot(String subRole, String userId, String status);

    @Query("SELECT DISTINCT u.subRole FROM User u WHERE u.subRole IN :roles AND u.status != :status")
    List<String> findOccupiedSubRoles(@Param("roles") List<String> roles, @Param("status") String status);
}