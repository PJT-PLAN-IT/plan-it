package com.pjt.planit.business.tripplan.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TripPlanMateDto {

    private Integer tripMateNo;
    private Integer tripPlanNo;
    private Integer custNo;
    private String nickName;

}
