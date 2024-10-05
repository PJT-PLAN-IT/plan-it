package com.pjt.planit.business.tripplan.controller;

import com.pjt.planit.business.tripplan.dto.TripPlanDto;
import com.pjt.planit.business.tripplan.dto.YearNoDto;
import com.pjt.planit.business.tripplan.service.PlanService;
import com.pjt.planit.core.security.filter.ResponseResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/plan")
@RestController
@RequiredArgsConstructor
public class TripPlanController {

    private final PlanService planService;

    /**
     * 여행 계획 디테일 리스트 출력
     * @RequestBody TripPlanYearNoDto
     * @return ResponseResult
     */

    @GetMapping
    public ResponseResult<?> getPlanList( @RequestParam int tripPlanNo) {
        TripPlanDto result = planService.getPlanDetail(tripPlanNo);
        return ResponseResult.ofSuccess("success", result);
    }

    /**
     * 여행 계획 리스트 출력
     * @RequestBody TripPlanYearNoDto
     * @return ResponseResult
     */
    @GetMapping("/list")
    public ResponseResult<?> getPlanListById(@RequestBody YearNoDto tripPlanYearNoDto) {
        List<?> result = planService.getPlanList(tripPlanYearNoDto.getCustNo(), tripPlanYearNoDto.getYear());
        return ResponseResult.ofSuccess("success", result);
    }


}
