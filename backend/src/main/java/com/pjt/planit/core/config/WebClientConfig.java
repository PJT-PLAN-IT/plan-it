package com.pjt.planit.core.config;

import io.netty.channel.ChannelOption;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;
import reactor.netty.http.client.HttpClient;

@Configuration
public class WebClientConfig {  //외부 api와 통신사는데 사용하는 설정
    //URI를 빌드하는 데 사용되는 클래스
    DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory();

    //연결 타임아웃 10초로 설정, 서버에 연결을 시도할때 10초이내에 응답이 없으면 연결 종료
    HttpClient httpClient = HttpClient.create()
            .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 10000);

    @Bean
    public WebClient webClient() {
        //쿼리 매개변수의 값만 URL 인코딩이 이루어지도록 설정
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.VALUES_ONLY);

        return WebClient.builder()
                //기본 URI 빌더 팩토리를 지정(DefaultUriBuilderFactory 객체인 factory)
                .uriBuilderFactory(factory)

                //메모리 사용량 설정(기본적으로 WebClient는 응답 데이터를 메모리에서 처리)
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(2 * 1024 * 1024))

                //HTTP 요청을 처리할 때 사용할 클라이언트를 지정
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();
    }
}
