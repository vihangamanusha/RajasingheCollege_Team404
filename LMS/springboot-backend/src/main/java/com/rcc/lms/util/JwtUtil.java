package com.rcc.lms.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

/**
 * JWT utility class — handles token generation and validation.
 * Equivalent to the jwt.sign() and jwt.verify() calls in authMiddleware.js.
 */
@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    private static final long EXPIRATION_MS = 86400000; // 24 hours

    /**
     * Build a signing key from the secret string.
     */
    private Key getSigningKey() {
        byte[] keyBytes = secret.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Generate a JWT token for a given username.
     * Equivalent to: jwt.sign({ username }, 'your_secret_key')
     */
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extract the username (subject) from a JWT token.
     */
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    /**
     * Validate that a token is not expired and belongs to the given username.
     * Equivalent to: jwt.verify(token, 'your_secret_key')
     */
    public boolean validateToken(String token, String username) {
        try {
            String extractedUsername = extractUsername(token);
            return extractedUsername.equals(username) && !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Check if a JWT token's expiration date has passed.
     */
    private boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    /**
     * Parse and return all claims from a JWT token.
     * Throws an exception if the token is invalid (same as authMiddleware.js catch block).
     */
    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
