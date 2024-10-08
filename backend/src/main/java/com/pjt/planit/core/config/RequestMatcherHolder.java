package com.pjt.planit.core.config;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RequestMatcherHolder {

    private final List<String> PERMIT_ALL_URLS = List.of(
            "/login",
            "/join",
            "/planit/**",
            "/api/test/**",
            "/**"
    );

}
