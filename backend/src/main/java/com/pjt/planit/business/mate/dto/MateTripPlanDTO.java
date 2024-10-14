package com.pjt.planit.business.mate.dto;

import java.util.ArrayList;
import java.util.List;
import com.pjt.planit.business.tripplan.dto.TripPlanDetailDto;
import com.pjt.planit.business.tripplan.dto.TripPlanDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MateTripPlanDTO {
	private String custName;
	private List<TripPlanDto> tripPlanList = new ArrayList<>();
	private List<TripPlanDetailDto> tripPlanDetailList = new ArrayList<>();
}
