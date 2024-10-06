package com.pjt.planit.core.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pjt.planit.business.cust.dto.CustInfoDto;
import com.pjt.planit.business.cust.dto.CustomCustDetails;
import com.pjt.planit.business.cust.dto.LoginDto;
import com.pjt.planit.core.security.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public LoginFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }


    @Nullable
    protected String obtainEmail(HttpServletRequest request) {
        return request.getParameter("email");
    }

    /**
     * 클라이언트에서 /login 호출 시 실행되는 메소드
     *
     * @param request p1
     * @param response p2
     * @return Authentication
     * @throws AuthenticationException e1
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        LoginDto loginDto;

        try {
            ServletInputStream inputStream = request.getInputStream();
            String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
            loginDto = objectMapper.readValue(messageBody, LoginDto.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String email = loginDto.getEmail();
        String password  = loginDto.getPassword();

        log.debug("로그인 시도: {} {}", email, password);

        // Spring Security 에서 username 과 password 를 검증하기 위해서는 token 에 담아야 함
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password);
        
        //token에 담은 검증을 위한 AuthenticationManager로 전달
        return authenticationManager.authenticate(authToken);
    }

    /**
     * 로그인 성공 시 실행하는 메소드
     *
     * @param request  p1
     * @param response p2
     * @param chain p3
     * @param authentication p4
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        CustomCustDetails customCustDetails = (CustomCustDetails) authentication.getPrincipal();
        
        String email = customCustDetails.getEmail();
        System.out.println("email: " + email);
        String token = jwtUtil.createJwt(email, 60*60*1000L);

        CustInfoDto custInfoDto = new CustInfoDto();
        custInfoDto.setEmail(email);
        custInfoDto.setNickname(customCustDetails.getNickname());
        custInfoDto.setCustNo(customCustDetails.getCustNo());


        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getOutputStream().write(objectMapper.writeValueAsString(ResponseResult.ofSuccess("로그인 성공", token)).getBytes());
        response.getOutputStream().write(objectMapper.writeValueAsBytes(custInfoDto));
        response.addHeader("Authorization", "Bearer " + token);

        log.debug("로그인 성공: {} ", email);
    }


    /**
     * 로그인 실패 시 실행하는 메소드
     *
     * @param request p1
     * @param response p2
     * @param failed p3
     */
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getOutputStream().write(objectMapper.writeValueAsString(ResponseResult.ofFailure(HttpStatus.UNAUTHORIZED, "로그인 실패")).getBytes());
        response.setStatus(401);

        log.debug("로그인 실패: {}", failed.getMessage());
    }
}
