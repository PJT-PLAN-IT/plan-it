package com.pjt.planit.business.tripplan.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PlanDto {
    private Integer tripPlanNo;

    private Integer custNo;

    private String title;

    private LocalDateTime startDt;

    private LocalDateTime endDt;

    private String thumbnailImg;

    private String review;

    private String publicYn;

    private String ownerYn;
}
