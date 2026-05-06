package com.rcc.lms.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
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
}