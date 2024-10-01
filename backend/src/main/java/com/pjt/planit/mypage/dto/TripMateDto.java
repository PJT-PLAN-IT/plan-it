package com.pjt.planit.mypage.dto;

import lombok.*;

/**
 * T_TRIP_MATE	확정된 여행 메이트
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TripMateDto {

    private Integer tripMateNo;
    private Integer tripPlanNo;
    private Integer custNo;
}
