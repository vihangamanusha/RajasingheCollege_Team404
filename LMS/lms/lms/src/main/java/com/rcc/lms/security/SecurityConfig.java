package com.rcc.lms.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Enables Spring Security annotations like @PreAuthorize
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// CORS configuration classes
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    // JWT filter (checks token in every request)
    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // =====================================
                // 1. Disable CSRF (not needed for REST API)
                // =====================================
                .csrf(csrf -> csrf.disable())

                // =====================================
                // 2. Enable CORS for React frontend
                // =====================================
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // =====================================
                // 3. Make session stateless (JWT system)
                // =====================================
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // =====================================
                // 4. API security rules
                // =====================================
                .authorizeHttpRequests(auth -> auth

                        // Public endpoints (NO token required)
                        .requestMatchers("/user/login", "/user/register").permitAll()

                        // All other endpoints require authentication
                        .anyRequest().authenticated()
                )

                // =====================================
                // 5. Disable default Spring login
                // =====================================
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        // =====================================
        // 6. Add JWT filter before authentication
        // =====================================
        http.addFilterBefore(jwtFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // =====================================
    // CORS CONFIGURATION (React frontend)
    // =====================================
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        // Allow React frontend URL
        config.setAllowedOrigins(List.of("http://localhost:5174"));

        // Allow HTTP methods
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Allow all headers (important for JWT token)
        config.setAllowedHeaders(List.of("*"));

        // Allow Authorization header + cookies
        config.setAllowCredentials(true);

        // Apply to all endpoints
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}