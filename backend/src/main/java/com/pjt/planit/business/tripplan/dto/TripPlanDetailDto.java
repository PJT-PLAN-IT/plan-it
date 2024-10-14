package com.pjt.planit.business.tripplan.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class TripPlanDetailDto {

    private Integer tripDetailNo;

    private LocalDateTime planDt;

    private Integer seq;

    private String contentid;

    private String contentTypeId;

    private String title;

    private String address;

    private Float mapx;

    private Float mapy;

    private Integer placeReviewNo;

    private Integer custNo;

    private Integer star;

    private String review;

    private String reviewImg1;

    private String reviewImg2;

    private String reviewImg3;

    private String reviewImg4;

}
