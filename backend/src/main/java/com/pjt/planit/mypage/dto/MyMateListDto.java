package com.pjt.planit.mypage.dto;

import com.pjt.planit.entity.Cust;
import com.pjt.planit.entity.TripPlan;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * T_TRIP_PLAN	여행계획 dto
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MyMateListDto {

    private int tripPlanNo;
    private int custNo;
    private String title;
    private LocalDateTime startDt;
    private LocalDateTime endDt;
    private String thumbnailImg;
    private String review;
    private String publicYn;
    private String createYmd;
    private FindMateDto findMateDto;

}
