package com.pjt.planit.config.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pjt.planit.business.cust.dto.CustomCustDetails;
import com.pjt.planit.db.entity.Cust;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    private final JwtUtil jwtUtil;

    private final ObjectMapper objectMapper;

    public LoginFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil, ObjectMapper objectMapper) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.objectMapper = objectMapper;
    }


    @Nullable
    protected String obtainEmail(HttpServletRequest request) {
        return request.getParameter("email");
    }



    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        String email = obtainEmail(request);
        String password  = obtainPassword(request);

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password);
        return authenticationManager.authenticate(authToken);
    }

    //로그인 성공시
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        CustomCustDetails customCustDetails = (CustomCustDetails) authentication.getPrincipal();

        String email = customCustDetails.getUsername();
        String token = jwtUtil.createJwt(email, 60*60*1000L);
        Cust cust = new Cust();
        cust.setEmail(email);
        cust.setNickname(customCustDetails.getNickname());
        cust.setCustNo(customCustDetails.getCustNo());
        response.getOutputStream().write(objectMapper.writeValueAsBytes(cust));
        response.setHeader("Content-Type", "application/json");
        response.addHeader("Authorization", "Bearer " + token);
    }

    //로그인 실패 시
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        response.setStatus(401);
    }
}
