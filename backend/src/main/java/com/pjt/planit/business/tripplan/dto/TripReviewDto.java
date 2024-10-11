package com.pjt.planit.business.tripplan.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TripReviewDto {

    private Integer tripPlanNo;
    private String review;

}
