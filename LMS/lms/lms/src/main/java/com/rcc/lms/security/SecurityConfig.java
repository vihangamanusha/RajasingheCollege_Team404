package com.rcc.lms.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    // JWT filter that checks token on every request
    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // -----------------------------
                // 1. Disable CSRF (REST API only)
                // -----------------------------
                .csrf(csrf -> csrf.disable())

                // -----------------------------
                // 2. Make session stateless (JWT does not use session)
                // -----------------------------
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // -----------------------------
                // 3. API access rules
                // -----------------------------
                .authorizeHttpRequests(auth -> auth

                        // allow public endpoints (no token needed)
                        .requestMatchers("/user/login", "/user/register").permitAll()
                        .requestMatchers("/api/news/**").permitAll()//vihanga

                        // all other APIs require JWT token
                        .anyRequest().authenticated()
                )

                // -----------------------------
                // 4. Disable default Spring login forms
                // -----------------------------
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        // -----------------------------
        // 5. Add JWT filter before Spring authentication
        // -----------------------------
        http.addFilterBefore(jwtFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    //vihanga
    @Bean
    public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
        org.springframework.web.cors.CorsConfiguration configuration = new org.springframework.web.cors.CorsConfiguration();

        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");

        org.springframework.web.cors.UrlBasedCorsConfigurationSource source =
                new org.springframework.web.cors.UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}