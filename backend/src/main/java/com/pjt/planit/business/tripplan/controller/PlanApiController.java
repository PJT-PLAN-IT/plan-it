package com.pjt.planit.business.tripplan.controller;

import com.pjt.planit.business.placeInfo.dto.ApiResponseDto;
import com.pjt.planit.business.tripplan.dto.openapi.BasicInfoDto;
import com.pjt.planit.business.tripplan.dto.openapi.PlaceInfoListDto;
import com.pjt.planit.business.tripplan.service.PlanApiService;
import com.pjt.planit.core.security.filter.ResponseResult;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequestMapping("/open-api/place")
public class PlanApiController {

    private final PlanApiService planApiService;

    public PlanApiController(PlanApiService planApiService) {
        this.planApiService = planApiService;
    }

    @GetMapping("/search")
    public ResponseResult<?> getPlaceByAreaCodeAndContentTypeId( @RequestBody BasicInfoDto basicInfoDto) throws UnsupportedEncodingException {
         ApiResponseDto<PlaceInfoListDto> result =  planApiService.getPlaceByAreaCodeAndContentTypeId(basicInfoDto);
         return ResponseResult.ofSuccess("success", result);
    }

    @GetMapping("/detail")
    public ResponseResult<?> getPlaceDetail(@RequestBody BasicInfoDto basicInfoDto) throws UnsupportedEncodingException {
        PlaceInfoListDto result =  planApiService.getPlaceByAreaCodeAndContentTypeIdAndReview(basicInfoDto);
        return ResponseResult.ofSuccess("success", result);
    }





}
