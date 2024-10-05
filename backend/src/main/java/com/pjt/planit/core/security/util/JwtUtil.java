package com.pjt.planit.core.security.util;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.pjt.planit.core.security.filter.ResponseResult;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Slf4j
@Component
public class JwtUtil {
//jwt 0.12.3 version

    private final SecretKey secretKey;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public JwtUtil(@Value("${spring.jwt.secret}") String secret) {
        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }


    /**
     * Token 내부 Email 검증하는 메소드
     *
     * @param token p1
     * @return String
     */
    public String getCustEmail(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("email", String.class);
    }

    /**
     * Token 만료되었는지 검증하는 메소드
     *
     * @param token       p1
     * @param request     p2
     * @param response    p3
     * @param filterChain p4
     * @throws ServletException e1
     * @throws IOException      e2
     */
    public void isExpired(String token, HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration();
        } catch (Exception e) {
            log.debug(e.getMessage());
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getOutputStream().write(objectMapper.writeValueAsString(ResponseResult.ofFailure(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다.")).getBytes());
            response.setStatus(401);
            filterChain.doFilter(request, response);
        }
    }

    /**
     * 로그인 성공 시 Token 생성하는 메소드
     *
     * @param email  p1
     * @param expiredMs p2
     * @return String
     */
    public String createJwt(String email, Long expiredMs) {

        return Jwts.builder()
                .claim("email", email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }

}
