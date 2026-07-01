package com.rcc.lms.security;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration//this is a configeration
@EnableMethodSecurity//enable method level security.
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    //main security configuration,Security works using filters
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
<<<<<<< HEAD
                // =========================
                // DISABLE CSRF-Cross Site Request Forgery--used for sesssion and cokkies
                // this disabled in REST APIs.
                // =========================
                .csrf(csrf -> csrf.disable())

                // =========================
                // CORS ENABLED- enables frontend-backend communication
                // =========================
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // =========================
                // STATELESS SESSION (JWT)
                // Server does NOT store login sessions,Client stores and JWT token
                // =========================
=======
                .csrf(csrf -> csrf.disable())

                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

>>>>>>> TG1388
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

<<<<<<< HEAD
                // =========================
                // AUTH RULES
                // =========================
                .authorizeHttpRequests(auth -> auth//defines who can access which API.

                        // Public APIs
                        .requestMatchers("/user/login", "/user/register").permitAll()//accessible without login.

                        // Allow preflight requests (IMPORTANT FIX)
                        .requestMatchers("/**").permitAll()//all endpoint can acesss.

                        // Everything else secured,need to loging.
                        .anyRequest().authenticated()
                )

                // Disable default login form
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        // Add JWT filter
=======
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/user/login",
                                "/user/register",
                                "/api/news/**",
                                "/api/contact/**",
                                "/api/students/**",
                                "/api/events/**",
                                "/api/announcements/**",
                                "/api/livestreams/**",
                                "/api/files/**",
                                "/api/sports/**",
                                "/uploads/**"

                        ).permitAll()
                        .anyRequest().authenticated()
                )

                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

>>>>>>> TG1388
        http.addFilterBefore(jwtFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

<<<<<<< HEAD
    // =========================
    // CORS CONFIG
    // =========================
=======
    // IMPORTANT CORS FIX
>>>>>>> TG1388
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

<<<<<<< HEAD
        // IMPORTANT: allow all localhost ports for now (DEV MODE FIX). different port.
        config.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:3000"
        ));

        //Allowed HTTP methods.
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        //Allows all headers
        config.setAllowedHeaders(List.of("*"));

        //Allow Credentials,used for frontend authentication
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);//Apply this CORS config to all endpoints.
=======
        config.setAllowedOrigins(List.of(
                "http://localhost:5176",
                "http://localhost:5173",
                "http://localhost:5174",

                "http://localhost:3000"
        ));

        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        config.setAllowedHeaders(List.of("*"));

        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);
>>>>>>> TG1388

        return source;
    }
}