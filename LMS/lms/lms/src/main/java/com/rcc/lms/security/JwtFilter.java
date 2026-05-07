package com.rcc.lms.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // =========================================
        // 1. GET REQUEST PATH
        // =========================================
        String path = request.getServletPath();

        // =========================================
        // 2. SKIP JWT FOR PUBLIC ENDPOINTS
        //    (VERY IMPORTANT or login = 403)
        // =========================================
        if (path.equals("/user/login") ||
                path.equals("/user/register")) {

            filterChain.doFilter(request, response);
            return;
        }

        // =========================================
        // 3. READ AUTH HEADER
        // =========================================
        String authHeader = request.getHeader("Authorization");

        String token = null;
        String username = null;

        // =========================================
        // 4. EXTRACT TOKEN IF PRESENT
        // =========================================
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            username = jwtUtil.extractUsername(token);
        }

        // =========================================
        // 5. VALIDATE TOKEN AND SET AUTH
        // =========================================
        if (username != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(username);

            if (jwtUtil.validateToken(token, username)) {

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // =========================================
        // 6. CONTINUE FILTER CHAIN
        // =========================================
        filterChain.doFilter(request, response);
    }
}