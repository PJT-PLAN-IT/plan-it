package com.pjt.planit.core.util.openapi;

import com.pjt.planit.core.config.WebClientConfig;
import com.pjt.planit.core.error.InternalServerException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class WebClientUtil {  //외부 api와 통신하기 위한 클래스 정의
    //application.yml에 정의된 값을 주입받아 API의 기본 URL로 사용
    @Value(value = "${travel.api.url}")
    private String apiUrl;

    //API 요청에 포함되는 공통 쿼리 매개변수를 정의
    private final static String COMMON_INFO = "?MobileOS=AND&MobileApp=Planit&_type=json&serviceKey=gxeOoeUZIhZaBpBE%2BokwhAY%2BOAuSYLSuCSG44ImsxwmbmT1M76pVGwITi641yb%2FN%2FkXNwqQ6uhCuae4ameM8gg%3D%3D";

    //외부 api와 통신사는데 사용하는 설정
    private final WebClientConfig webClientConfig;

    public <T> T get(String path, String param, ParameterizedTypeReference<T> responseType) {
         return webClientConfig.webClient().method(HttpMethod.GET)
//                API URL을 동적으로 구성
//                apiUrl: 기본 URL (application.yml에서 정의됨).
//                path: 각 API 요청에 따라 달라지는 경로.
//                COMMON_INFO: 모든 요청에 포함되는 공통 매개변수.
//                param: 추가적으로 전달하는 쿼리 매개변수 (개별 API 호출 시 전달)
                .uri(apiUrl.concat(path).concat(COMMON_INFO).concat("&").concat(param))

                //요청을 수행하고 응답을 가져오는 메소드
                .retrieve()

                //상태 코드에 따른 에러 처리
                .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> Mono.error(InternalServerException.EXCEPTION))
                .onStatus(HttpStatusCode::is5xxServerError, clientResponse -> Mono.error(InternalServerException.EXCEPTION))

                //응답 본문을 DTO로 변환
                .bodyToMono(responseType)
                .block();
    }
}
