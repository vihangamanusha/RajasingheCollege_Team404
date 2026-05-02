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
 * JWT Authentication Filter — runs once per request.
 *
 * This is the direct equivalent of authMiddleware.js:
 *
 *   const token = req.header('Authorization');
 *   if (!token) return res.status(401).send('Access Denied');
 *   try {
 *       const verified = jwt.verify(token, 'your_secret_key');
 *       req.user = verified;
 *       next();
 *   } catch (err) {
 *       res.status(400).send('token is not valid');
 *   }
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

        // Read the Authorization header (same as req.header('Authorization'))
        String authHeader = request.getHeader("Authorization");

        String token = null;
        String username = null;

        // Support both "Bearer <token>" and raw token formats
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        } else if (authHeader != null) {
            token = authHeader;
        }

        // If token is present, try to extract and verify it
        if (token != null) {
            try {
                username = jwtUtil.extractUsername(token);
            } catch (Exception e) {
                // Token is invalid — equivalent to: res.status(400).send('token is not valid')
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("token is not valid");
                return;
            }
        }

        // If username extracted and no existing auth in context, set authentication
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (jwtUtil.validateToken(token, username)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Continue the filter chain (equivalent to next())
        filterChain.doFilter(request, response);
    }
}
