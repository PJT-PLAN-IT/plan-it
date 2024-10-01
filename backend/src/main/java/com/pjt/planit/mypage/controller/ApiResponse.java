package com.pjt.planit.mypage.controller;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {
    private int code;
    private String msg;
    private Object data;

    public static ApiResponse ok(){
        return ApiResponse.builder()
                .code(200)
                .msg("ok")
                .build();
    }

    public static ApiResponse ok(Object data){
        return ApiResponse.builder()
                .code(200)
                .msg("ok")
                .data(data)
                .build();
    }
}
