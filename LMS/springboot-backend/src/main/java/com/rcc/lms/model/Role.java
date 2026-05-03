package com.rcc.lms.model;

/**
 * System Roles for LMS
 * This ensures only valid roles are used in the system
 */
public enum Role {
    ADMIN,
    STUDENT,
    TEACHER,
    TECHNICAL_OFFICER,

    // Teacher sub-roles
    HOD,
    DEPUTY_PRINCIPAL
}