package com.pjt.planit.business.tripplan.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class InviteMateDto {

    private Integer tripPlanNo;

    private Integer custNo;

    private String nickName;

}
