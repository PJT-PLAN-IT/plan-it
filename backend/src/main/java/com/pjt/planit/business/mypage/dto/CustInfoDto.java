package com.pjt.planit.business.mypage.dto;

import lombok.*;

/**
 * 개인정보 수정
 */
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
