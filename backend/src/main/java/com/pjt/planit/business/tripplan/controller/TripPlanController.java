package com.pjt.planit.business.tripplan.controller;

import com.pjt.planit.business.tripplan.dto.*;
import com.pjt.planit.business.tripplan.service.PlanService;
import com.pjt.planit.core.security.filter.ResponseResult;
import com.pjt.planit.core.util.FindAuthorizedUser;
import lombok.RequiredArgsConstructor;
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
     * @RequestParam tripPlanNo
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
     * @param tripPlanNo
     * @return ResponseResult
     */
    @DeleteMapping
    public ResponseResult<?> deleteTripPlan(@RequestParam Integer tripPlanNo) {

        planService.deleteTripPlan(tripPlanNo);

        return ResponseResult.ofSuccess("success", null);
    }

    /**
     * 여행 후기 작성
     *
     */
    @PostMapping("/review")
    public ResponseResult<?> addPlanReview(@RequestBody TripReviewDto tripReviewDto) {
        planService.addReview(tripReviewDto);
        return ResponseResult.ofSuccess("success", null);
    }

    /**
     * 여행 후기 공개/비공개 설정
     * @param tripPublicYnDto
     */
    @PostMapping("/public")
    public ResponseResult<?> reviewTripPlan(@RequestBody TripPublicYnDto tripPublicYnDto) {
        planService.changePublic(tripPublicYnDto);
        return ResponseResult.ofSuccess("success", null);
    }


}
