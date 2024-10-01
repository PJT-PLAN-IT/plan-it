package com.pjt.planit.mypage.dto;

import com.pjt.planit.entity.FindMateApply;
import lombok.*;

import java.time.LocalDateTime;

/**
 * T_FIND_MATE_APPLY 메이트 신청 현황 dto
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FindMateApplyDto {
    private Integer findMateApplyNo;
    private Integer findMateNo;
    private Integer custNo;
    private String allowYn;
    private String refuseYn;
    private LocalDateTime applyDt;
    private LocalDateTime expiredDt;
    private String custName;

    public FindMateApplyDto entityToDto(FindMateApply entity, String custName ){
        return FindMateApplyDto.builder()
                .findMateApplyNo(entity.getFindMateApplyNo())
                .findMateNo(entity.getFindMateNo())
                .custNo(entity.getCustNo())
                .allowYn(entity.getAllowYn())
                .refuseYn(entity.getRefuseYn())
                .applyDt(entity.getApplyDt())
                .expiredDt(entity.getExpiredDt())
                .custName(custName)
                .build();
    }
}
