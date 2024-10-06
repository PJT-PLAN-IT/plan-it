package com.pjt.planit.business.placeInfo.dto;

import lombok.*;

import java.time.format.DateTimeFormatter;

/**
 * 여행정보 리뷰 조회하기
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlaceReviewDto {

    //T_PLACE_REVIEW
    private Integer placeReviewNo;
    private String contentid;
    private Integer star;

    private String starAvg;

    private String review;
    private String reviewImg1;
    private String reviewImg2;
    private String reviewImg3;
    private String reviewImg4;
    private String createDt;

    //T_CUST
    private String name;

    private Integer totalCount;
    private Integer totalPage;

    public static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

}
