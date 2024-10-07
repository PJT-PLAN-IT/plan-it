package com.pjt.planit.business.tripplan.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class TripPlanDto {

    private Integer custNo;

    private Integer tripPlanNo;

    private String title;

    private LocalDateTime startDt;

    private LocalDateTime endDt;

    private String thumbnailImg;

    private String review;

    private String publicYn;

    private String ownerYn;

    private List<TripPlanDetailDto> tripPlanDetailList = new ArrayList<>();

    private List<TripPlanMateDto> tripPlanMateList = new ArrayList<>();

}
