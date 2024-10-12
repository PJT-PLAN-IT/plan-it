package com.pjt.planit.business.cust.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CustInfoDto {
    private String token;
    private String email;
    private int custNo;
    private String nickname;

}
