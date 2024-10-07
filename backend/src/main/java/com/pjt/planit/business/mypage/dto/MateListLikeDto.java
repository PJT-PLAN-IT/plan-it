package com.pjt.planit.business.mypage.dto;

import lombok.*;

import java.time.LocalDateTime;

/**
 * 좋아요한 메이트 공고
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MateListLikeDto {

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
    //T_FIND_MATE_LIKE
    private Integer findMateLikeNo;
}
