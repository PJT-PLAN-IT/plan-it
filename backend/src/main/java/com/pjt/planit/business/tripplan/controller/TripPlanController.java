package com.pjt.planit.business.tripplan.controller;

import com.pjt.planit.business.tripplan.dto.TripPlanDetailDto;
import com.pjt.planit.business.tripplan.dto.TripPlanDto;
import com.pjt.planit.business.tripplan.dto.YearNoDto;
import com.pjt.planit.business.tripplan.service.PlanService;
import com.pjt.planit.core.security.filter.ResponseResult;
import com.pjt.planit.core.util.FindAuthorizedUser;
import com.pjt.planit.db.entity.TripDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/plan")
@RestController
@RequiredArgsConstructor
public class TripPlanController {

    private final PlanService planService;
    private final FindAuthorizedUser findAuthorizedUser;

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


    /**
     * 여행 계획 디테일 출력
     * @RequestBody TripPlanYearNoDto
     * @return ResponseResult
     */
    @GetMapping
    public ResponseResult<?> getPlanList( @RequestParam int tripPlanNo) {
        TripPlanDto result = planService.getPlanDetail(tripPlanNo);
        return ResponseResult.ofSuccess("success", result);
    }


    /**
     * 여행 계획 저장
     * @RequestBody TripPlanYearNoDto
     * @return ResponseResult
     */
    @PostMapping
    public ResponseResult<?> addTripPlan(@RequestBody TripPlanDto tripPlanDto) {

        Integer custNo = findAuthorizedUser.findUser().get().getCustNo();

        if ( !tripPlanDto.getCustNo().equals(custNo)) {
            return ResponseResult.ofSuccess("unauthorized user", null);
        }

        planService.addTripPlan(tripPlanDto);
        return ResponseResult.ofSuccess("success", null);
    }


    /**
     * 여행 계획 수정
     * @RequestBody TripPlanDto
     * @return ResponseResult
     */
    @PutMapping
    public ResponseResult<?> updateTripPlan(@RequestBody TripPlanDto tripPlanDto) {

        Integer custNo = findAuthorizedUser.findUser().get().getCustNo();

        if ( !tripPlanDto.getCustNo().equals(custNo)) {
            return ResponseResult.ofSuccess("unauthorized user", null);
        }

        planService.updateTripPlan(tripPlanDto);
        return ResponseResult.ofSuccess("success", null);
    }

    /**
     * 여행 계획 삭제
     *
     */
    @DeleteMapping
    public ResponseResult<?> deleteTripPlan(@RequestParam Integer tripPlanNo) {

        planService.deleteTripPlan(tripPlanNo);

        return ResponseResult.ofSuccess("success", null);
    }




}
