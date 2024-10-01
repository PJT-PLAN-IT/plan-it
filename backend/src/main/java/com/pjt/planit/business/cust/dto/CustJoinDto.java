package com.pjt.planit.business.cust.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CustJoinDto {

    private String email;

    private String pw;

    private String name;

    private String nickname;

    private String phoneNumber;

    private LocalDateTime birthDt;

    private String gender; // M or W

    private LocalDateTime joinDt;

}
