package com.pjt.planit.business.main.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 인기많은 메이트글
 */
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FindMateLikeDto {

    //T_FIND_MATE
    private Integer findMateNo;
    private String title;
    private String genderType;
    private Integer recruits;   //모집인원
    private String twentyYn;
    private String thirtyYn;
    private String fortyYn;
    private String fiftyYn;
    private String thumbnailImg;

    private List<Integer> regions;
    private List<Integer> tripStyles;

    //T_TRIP_PLAN
    private Integer tripPlanNo;
    private String startDt;
    private String endDt;

    //T_CUST
    private String name;

    //T_TRIP_MATE 확정된 인원
    private Integer tripMateNo;

}
