package com.pjt.planit.mypage.dto;

import com.pjt.planit.entity.FindMateApply;
import lombok.*;

import java.time.LocalDateTime;

/**
 * TT_FIND_MATE_APPLY 메이트 신청 허가, 거절 dto
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyMateApplyUpdateDto {

    private Integer findMateApplyNo;
    private Integer tripPlanNo;
    private Integer custNo;
    private String allowYn;
    private String refuseYn;
}