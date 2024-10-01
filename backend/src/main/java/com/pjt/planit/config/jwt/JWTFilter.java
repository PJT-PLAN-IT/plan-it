package com.pjt.planit.config.jwt;

import com.pjt.planit.business.cust.dto.CustomCustDetails;
import com.pjt.planit.db.entity.Cust;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
public class JWTFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JWTFilter(JwtUtil jwtUtil) {

        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException, IOException {

        //request에서 Authorization 헤더를 찾음
        String authorization = request.getHeader("Authorization");

        //Authorization 헤더 검증
        if (authorization == null || !authorization.startsWith("Bearer ")) {

            log.info("token null");
            
            //filter 종료 후 다음 필터로 request와 response로 넘겨줌
            filterChain.doFilter(request, response);

            //조건이 해당되면 메소드 종료 (필수)
            return;
        }


        log.info("authorization now");
        //Bearer 뒷부분의 순수 토큰만 획득
        String token = authorization.split(" ")[1];

        // 토큰 만료 시간 검증
        try {
            jwtUtil.isExpired(token);
        } catch (ExpiredJwtException e) {
            System.out.println("token expired");
            filterChain.doFilter(request, response);
            return; // 조건에 해당하면 메소드 종료 (필수)
        }


        //일시적인 session 생성
        //토큰에서 username 획득
        String email = jwtUtil.getCustEmail(token);

        //Cust entity에 값 초기화
        Cust cust = new Cust();
        cust.setEmail(email);
        cust.setPw("temporary_pw"); //db는 임시적인 값을 넣어줌.

        //UserDetails에 회원 정보 객체 담기
        CustomCustDetails customUserDetails = new CustomCustDetails(cust);

        //스프링 시큐리티 인증 토큰 생성
        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
        //세션에 사용자 등록
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}