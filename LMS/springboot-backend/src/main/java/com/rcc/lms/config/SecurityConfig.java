package com.rcc.lms.config;

import com.rcc.lms.middleware.JwtAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Security configuration for the LMS backend.
 * Controls:
 * - Public endpoints
 * - Protected endpoints
 * - Stateless session (JWT based authentication)
 */

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // Disable CSRF because this is a REST API
                .csrf(csrf -> csrf.disable())

                // Disable session creation (JWT is stateless)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Define route access rules
                .authorizeHttpRequests(auth -> auth

                        // Public routes that do not require authentication
                        .requestMatchers(
                                "/",
                                "/api/auth/**",
                                "/error"
                        ).permitAll()

                        // All other routes require authentication
                        .anyRequest().authenticated()
                )

                // Add JWT filter before Spring Security authentication filter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}