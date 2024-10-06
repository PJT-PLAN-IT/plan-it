package com.pjt.planit.core.config;

import com.pjt.planit.core.security.filter.JWTFilter;
import com.pjt.planit.core.security.util.JwtUtil;
import com.pjt.planit.core.security.filter.LoginFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Collections;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JwtUtil jwtUtil;


    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration, JwtUtil jwtUtil) {

        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtil = jwtUtil;
    }

    /**
     * AuthenticationManager 등록 Bean
     *
     * @param configuration p1
     * @return AuthenticationManager
     * @throws Exception e1
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    /**
     * Password Hash 암호화 Bean
     *
     * @return BCryptPasswordEncoder
     */
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }

    /**
     * HTTP 통신 Security Filter 설정
     *
     * @param http p1
     * @return SecurityFilterChain
     * @throws Exception e1
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        RequestMatcherHolder requestMatcherHolder = new RequestMatcherHolder();

        // 0. CORS 설정
        http.cors((cors) -> cors.configurationSource(request -> {
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowCredentials(true);
            configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
            configuration.setAllowedMethods(Collections.singletonList("*"));
            configuration.setAllowedHeaders(Collections.singletonList("*"));
            configuration.setMaxAge(3600L);
            configuration.setExposedHeaders(Collections.singletonList("Authorization"));
            return configuration;
        }));

        // 1. csrf disable
        // Stateless Session 방식으로 인해 CSRF 공격 방어할 필요가 없으므로 해당 기능 disable
        http.csrf(AbstractHttpConfigurer::disable);

        // 2. Form 로그인 방식 disable
        // REST 방식의 JWT 로그인을 사용할 것이므로 Form 로그인 접근 제한
        http.formLogin(AbstractHttpConfigurer::disable);

        // 3. Http Basic 인증 방식 disable
        // REST 방식의 JWT 로그인을 사용할 것이므로 HTTP Basic 로그인 접근 제한
        http.httpBasic(AbstractHttpConfigurer::disable);

        // 4. 경로별 인가 작업
        http.authorizeHttpRequests((auth) -> auth
                .requestMatchers(
                        requestMatcherHolder.getPERMIT_ALL_URLS().toArray(new String[0])
                ).permitAll()
                .anyRequest().authenticated());

        // 5. 필터 추가
        // LoginFilter 는 AuthenticationConfiguration 객체를 인자로 받은 AuthenticationManager 를 인자로 받음 (즉, LoginFilter(AuthenticationManager(AuthenticationConfiguration)) 형식)
        http.addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil), UsernamePasswordAuthenticationFilter.class);
        // JwtFilter 가 LoginFilter 뒤에서 필터링되도록 설정 => 특정 케이스에서 Login Filter 보다 JWT Filter 가 먼저 실행될 때 발생하는 오류가 있음
        http.addFilterAfter(new JWTFilter(jwtUtil), LoginFilter.class);

        // 6. 세션 설정
        // Session Stateless 설정
        http.sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

}