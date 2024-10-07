package com.pjt.planit.business.tripplan.dto.openapi;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlaceInfoReviewDto {
    private Integer placeReviewNo;
    private Integer star;
    private Integer custNo;
    private String nickName;
    private String contentid;
    private String review;
    private String reviewImage1;
    private String reviewImage2;
    private String reviewImage3;
    private String reviewImage4;

}
