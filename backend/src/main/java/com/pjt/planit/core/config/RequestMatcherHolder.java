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
            "mate/**",
            "/planit/mates/details",
            "api/images/upload",
            "api/mate/reply/**",
            "api/mate/participate/**",
            "api/mate/tripplans",
            "api/mate/tripDetails",
            "/images/**",
            "api/planit/mates"
    );

}
