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

	private List<Integer> regions;
	private List<Integer> tripStyles;
	private LocalDateTime startDate;
	private LocalDateTime endDate;
	private String gender;
    private String twentyYN;
    private String thirtyYN;
    private String fortyYN;
    private String fiftyYN;
	private int mateNum;
	private String gotPlanYn;
}
