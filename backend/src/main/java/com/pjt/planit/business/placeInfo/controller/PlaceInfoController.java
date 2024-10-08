package com.pjt.planit.business.placeInfo.controller;

import com.pjt.planit.business.placeInfo.dto.PlaceReviewDto;
import com.pjt.planit.business.placeInfo.service.PlaceDetailService;
import com.pjt.planit.business.placeInfo.service.PlaceInfoService;
import com.pjt.planit.core.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/place")
public class PlaceInfoController {

    private final PlaceDetailService placeDetailService;
    private final PlaceInfoService placeInfoService;

    //여행장소 리뷰 조회
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

    //키워드 검색 조회
    @GetMapping("/keyword")
    public ApiResponse keyWord(@RequestParam String keyword) throws UnsupportedEncodingException {
        return ApiResponse.ok("ok", placeInfoService.keyWord(keyword));
    }

    //공통정보 조회
    @GetMapping("/commonInfo")
    public ApiResponse commonInfo(@RequestParam String contentId,
                                  @RequestParam(defaultValue = "Y") String defaultYN,
                                  @RequestParam(defaultValue = "Y") String firstImageYN,
                                  @RequestParam(defaultValue = "Y") String areacodeYN,
                                  @RequestParam(defaultValue = "Y") String addrinfoYN,
                                  @RequestParam(defaultValue = "Y") String overviewYN){
        return ApiResponse.ok("ok", placeDetailService.commonInfo(contentId, defaultYN, firstImageYN, areacodeYN, addrinfoYN, overviewYN));
    }

    //소개 상세정보 조회
    @GetMapping("/detailInfo")
    public ApiResponse detailInfo(@RequestParam String contentId,
                                  @RequestParam String contentTypeId) {
        return ApiResponse.ok("ok", placeDetailService.detailInfo(contentId, contentTypeId));
    }

}
