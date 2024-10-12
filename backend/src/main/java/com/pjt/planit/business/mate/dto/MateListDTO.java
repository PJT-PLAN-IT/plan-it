package com.pjt.planit.business.mate.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MateListDTO {
	private Integer findMateNo;
	private Integer tripPlanNo;
	private String findMateCreateBy;
	private String title;
	private LocalDateTime startDate;
	private LocalDateTime endDate;
	private String gender;
	private Integer recruits;
	private String twentyYN;
	private String thirtyYN;
	private String fortyYN;
	private String fiftyYN;
	private String thumbnailImg;
	private Integer findMateLikeNo;
	private Integer CustNo;
	private Integer findMateApplyNo;
	private String appAllowYn;
	private String appRefuseYn;
	private List<Integer> regions;
	private List<Integer> tripStyles;
}
