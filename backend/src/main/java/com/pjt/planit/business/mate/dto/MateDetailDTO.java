package com.pjt.planit.business.mate.dto;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.pjt.planit.business.tripplan.dto.TripPlanDetailDto;
import com.pjt.planit.business.tripplan.dto.TripPlanDto;
import com.pjt.planit.db.entity.FindMateReply;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MateDetailDTO {
	private Integer findMateNo;
	private String findMateCreateBy;
	private Integer CustNo;
	private Integer tripPlanNo;
    private String title;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime updateDate;
    private Integer mateNum;
    private String content;
    private String gender;

    private String regions;
    public List<Integer> getRegionsList() {
        if (this.regions != null && !this.regions.isEmpty()) {
            return Arrays.stream(this.regions.split(","))
                    .map(Integer::parseInt) // 문자열을 Integer로 변환
                    .distinct()
                    .collect(Collectors.toList());
        }
        return List.of();
    }

    private String tripStyles;
    public List<Integer> getTripStylesList() {
        if (this.tripStyles != null && !this.tripStyles.isEmpty()) {
            return Arrays.stream(this.tripStyles.split(","))
                    .map(Integer::parseInt) // 문자열을 Integer로 변환
                    .distinct()
                    .collect(Collectors.toList());
        }
        return List.of();
    }


    private String twentyYN;
    private String thirtyYN;
    private String fortyYN;
    private String fiftyYN;
    private String thumbnailImg;
    private List<TripPlanDto> tripPlanList = new ArrayList<>();
	private List<TripPlanDetailDto> tripPlanDetailList = new ArrayList<>();
	private List<FindMateReply> mateReplyList = new ArrayList<>();
	private Integer findMateAppNo;
	private String appAllowYn;
	private String appRefuseYn;
	private LocalDateTime applyDt;
	private LocalDateTime expiredDt;
	private Integer tripMateNo;
	private Integer mateCnfrmNo;
	private Integer findMateLikeNo;
}
