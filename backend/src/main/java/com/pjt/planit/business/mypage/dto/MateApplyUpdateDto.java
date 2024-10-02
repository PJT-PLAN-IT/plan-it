package com.pjt.planit.business.mypage.dto;

import lombok.*;

/**
 * 메이트 신청 허가, 거절 dto
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MateApplyUpdateDto {

    private Integer findMateApplyNo;
    private Integer tripPlanNo;
    private Integer custNo;
    private String allowYn;
    private String refuseYn;
}