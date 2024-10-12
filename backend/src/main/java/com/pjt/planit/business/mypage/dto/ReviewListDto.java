package com.pjt.planit.business.mypage.dto;

import lombok.*;

import java.time.format.DateTimeFormatter;

/**
 * 내가 작성한 리뷰 조회
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewListDto {

    //T_PLACE_REVIEW
    private Integer placeReviewNo;
    private String contentid;
    private Integer star;
    private String review;
    private String reviewImg1;
    private String reviewImg2;
    private String reviewImg3;
    private String reviewImg4;
    private String createDt;

    private Integer totalCount;
    private Integer totalPage;

}
