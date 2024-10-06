package com.pjt.planit.business.placeInfo.controller;

import com.pjt.planit.business.placeInfo.dto.PlaceReviewDto;
import com.pjt.planit.business.placeInfo.service.PlaceDetailService;
import com.pjt.planit.business.placeInfo.service.PlaceInfoService;
import com.pjt.planit.core.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/place")
public class PlaceInfoController {

    private final PlaceDetailService placeDetailService;
    private final PlaceInfoService placeInfoService;

    @GetMapping("/reviews/{contentid}")
    public ApiResponse review(@PathVariable String contentid,
                              @RequestParam(defaultValue = "0") Integer page,
                              @RequestParam(defaultValue = "4") Integer size) {
        List<PlaceReviewDto> list = placeDetailService.reviews(contentid, page, size);
        return ApiResponse.ok("ok", list);
    }


    //지역코드
    @GetMapping("/region")
    public ApiResponse region(){
        return ApiResponse.ok("ok", placeInfoService.region());
    }

    //지역코드 + 카테고리
    @GetMapping("/region/type")
    public ApiResponse regionType(@RequestParam(defaultValue = "12") Integer numOfRows,
                                                    @RequestParam(defaultValue = "1") Integer pageNo,
                                                    @RequestParam(defaultValue = "O") String arrange,
                                                    @RequestParam String contentTypeId,
                                                    @RequestParam String areaCode) {
        return ApiResponse.ok("ok", placeInfoService.regionType(numOfRows, pageNo, arrange, contentTypeId, areaCode));
    }
}
