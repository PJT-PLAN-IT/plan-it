package com.pjt.planit.business.tripplan.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class InviteMateDto {

    private Integer tripPlanNo;

    private Integer custNo;

    private Integer inviteCustNo;

    private LocalDateTime inviteDt;

    private LocalDateTime expiredDt;

    private String acceptYn;

    private String rejectYn;

}
