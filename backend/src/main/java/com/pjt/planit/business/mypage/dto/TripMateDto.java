package com.pjt.planit.business.mypage.dto;

import lombok.*;

/**
 * 확정된 여행 메이트, 메이트 탈퇴
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
