package com.pjt.planit.business.placeInfo.controller;

import com.pjt.planit.business.placeInfo.dto.PlaceReviewDto;
import com.pjt.planit.business.placeInfo.service.PlaceDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/place")
public class PlaceDetailController {

    private final PlaceDetailService placeDetailService;

    @GetMapping("/reviews/{contentid}")
    public ApiResponse review(@PathVariable String contentid,
                              @RequestParam(defaultValue = "0") Integer page,
                              @RequestParam(defaultValue = "4") Integer size) {
        List<PlaceReviewDto> list = placeDetailService.reviews(contentid, page, size);
        return ApiResponse.ok(list);
    }
}
