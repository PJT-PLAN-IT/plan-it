package com.pjt.planit.mypage.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustInfoDto {

    private Integer custNo;
    private String email;
    private String pw;
    private String name;
    private String nickname;
    private String phoneNumber;
    private String birthYear;
    private String birthMonth;
    private String birthDay;
    private String gender; // M or W
}
