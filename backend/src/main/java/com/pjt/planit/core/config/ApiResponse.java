package com.pjt.planit.core.config;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {
    private int code;
    private String msg;
    private Object data;

    /**
     *
     * @param message p1
     * @return ApiResponse
     */
    public static ApiResponse ok(String message){
        return ApiResponse.builder()
                .code(200)
                .msg(message)
                .build();
    }

    /**
     *
     * @param message p1
     * @param data d
     * @return ApiResponse
     */
    public static ApiResponse ok(String message, Object data){
        return ApiResponse.builder()
                .code(200)
                .msg(message)
                .data(data)
                .build();
    }
}
