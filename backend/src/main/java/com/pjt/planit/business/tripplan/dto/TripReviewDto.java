package com.pjt.planit.business.tripplan.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TripReviewDto {

    private String review;
    private Integer tripPlanNo;

}
