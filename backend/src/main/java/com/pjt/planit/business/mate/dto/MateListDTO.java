package com.pjt.planit.business.mate.dto;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MateListDTO {

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

	//T_TRIP_PLAN
	private Integer tripPlanNo;
	private LocalDateTime startDt;
	private LocalDateTime endDt;

	//T_CUST
	private String name;

	//T_TRIP_MATE 확정된 인원
	private Integer tripMateNum;


}
