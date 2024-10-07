package com.pjt.planit.business.tripplan.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PlaceReviewDto {

    private Integer placeReviewNo;

    private Integer tripDetailNo;

    private Integer custNo;

    private String contentid;

    private Integer star;

    private String review;

    private String reviewImg1;

    private String reviewImg2;

    private String reviewImg3;

    private String reviewImg4;

}
