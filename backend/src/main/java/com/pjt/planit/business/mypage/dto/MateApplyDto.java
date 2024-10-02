package com.pjt.planit.business.mypage.dto;

import com.pjt.planit.db.entity.FindMateApply;
import lombok.*;

/**
 * 신청 현황
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MateApplyDto {

    //T_FIND_MATE_APPLY
    private Integer findMateApplyNo;
    private Integer custNo;
    private String allowYn;
    private String refuseYn;
    //T_CUST
    private String custName;

    public MateApplyDto entityToDto(FindMateApply entity, String custName ){
        return MateApplyDto.builder()
                .findMateApplyNo(entity.getFindMateApplyNo())
                .custNo(entity.getCustNo())
                .allowYn(entity.getAllowYn())
                .refuseYn(entity.getRefuseYn())
                .custName(custName)
                .build();
    }
}
