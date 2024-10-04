package com.pjt.planit.business.mypage.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewUpdateDto {

    //T_PLACE_REVIEW
    private Integer placeReviewNo;
    private String contentid;
    private Integer star;
    private String review;
    private String reviewImg1;
    private String reviewImg2;
    private String reviewImg3;
    private String reviewImg4;
}
