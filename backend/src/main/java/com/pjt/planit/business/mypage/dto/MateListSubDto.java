package com.pjt.planit.business.mypage.dto;

import lombok.*;

import java.time.LocalDateTime;

/**
 * 신청한 메이트글 조회
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MateListSubDto {

    //T_FIND_MATE
    private Integer findMateNo;
    private String title;
    private String content;
    private String thumbnailImg;
    //T_TRIP_PLAN
    private LocalDateTime startDt;
    private LocalDateTime endDt;
    //T_CUST
    private String name;

}
