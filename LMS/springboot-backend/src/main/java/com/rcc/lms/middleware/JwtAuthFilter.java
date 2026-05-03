package com.rcc.lms.middleware;

import com.rcc.lms.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

/**
 * JWT authentication filter.
 * This filter runs for every request.
 *
 * Responsibilities:
 * - Read Authorization header
 * - Extract JWT token
 * - Validate token
 * - Set authentication in Spring Security context
 */

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // Get request URL path
        String path = request.getRequestURI();

        // Skip authentication for public routes
        if (path.startsWith("/api/auth") || path.equals("/")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Read Authorization header
        String authHeader = request.getHeader("Authorization");

        String token = null;
        String username = null;

        // Extract token from Bearer format
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }

        // Extract username from token
        try {
            if (token != null) {
                username = jwtUtil.extractUsername(token);
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("Invalid token");
            return;
        }

        // Validate token and set authentication context
        if (username != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

            if (jwtUtil.validateToken(token, username)) {

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                username,
                                null,
                                new ArrayList<>()
                        );

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        // Continue request flow
        filterChain.doFilter(request, response);
    }
}