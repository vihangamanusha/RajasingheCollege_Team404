package com.rcc.lms.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Enables Spring Security configuration
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// CORS (Cross-Origin Resource Sharing) imports
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity // Enables @PreAuthorize annotations in controllers
public class SecurityConfig {

    // JWT filter that checks token in every request
    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // -----------------------------------------
                // 1. Disable CSRF (not needed for REST API)
                // -----------------------------------------
                .csrf(csrf -> csrf.disable())

                // -----------------------------------------
                // 2. Enable CORS (VERY IMPORTANT for React)
                // -----------------------------------------
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // -----------------------------------------
                // 3. Make session stateless (JWT system)
                // -----------------------------------------
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // -----------------------------------------
                // 4. API Security Rules
                // -----------------------------------------
                .authorizeHttpRequests(auth -> auth

                        // Public APIs (no token needed)
                        .requestMatchers("/user/login", "/user/register").permitAll()

                        // All other APIs need authentication
                        .anyRequest().authenticated()
                )

                // -----------------------------------------
                // 5. Disable default login forms
                // -----------------------------------------
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        // -----------------------------------------
        // 6. Add JWT filter before Spring security
        // -----------------------------------------
        http.addFilterBefore(jwtFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // =========================================
    // CORS CONFIGURATION (ALLOW REACT FRONTEND)
    // =========================================
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        // Allow React frontend URL
        config.setAllowedOrigins(List.of("http://localhost:5174"));

        // Allow HTTP methods
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Allow all headers (important for JWT token)
        config.setAllowedHeaders(List.of("*"));

        // Allow sending cookies / auth headers
        config.setAllowCredentials(true);

        // Apply CORS settings to all endpoints
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}