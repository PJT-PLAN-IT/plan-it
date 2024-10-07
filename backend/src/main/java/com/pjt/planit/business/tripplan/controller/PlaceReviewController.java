package com.pjt.planit.business.tripplan.controller;

import com.pjt.planit.business.tripplan.dto.PlaceReviewDto;
import com.pjt.planit.business.tripplan.service.PlaceReviewService;
import com.pjt.planit.core.security.filter.ResponseResult;
import com.pjt.planit.core.util.FindAuthorizedUser;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/place-review")
@RestController
public class PlaceReviewController {

    private final FindAuthorizedUser findAuthorizedUser;
    private final PlaceReviewService placeReviewService;

    public PlaceReviewController(FindAuthorizedUser findAuthorizedUser, PlaceReviewService placeReviewService) {
        this.findAuthorizedUser = findAuthorizedUser;
        this.placeReviewService = placeReviewService;
    }

    /**
     * 여행 장소 리뷰 추가
     * @param placeReviewDto
     * @return
     */
    @PostMapping
    public ResponseResult<?> addPlaceReview(@RequestBody PlaceReviewDto placeReviewDto) {
        Integer custNo = findAuthorizedUser.findUser().get().getCustNo();
        if ( !placeReviewDto.getCustNo().equals(custNo)) {
            return ResponseResult.ofSuccess("unauthorized user", null);
        }

        if(!placeReviewService.isCustNoEquals(placeReviewDto.getTripDetailNo(), custNo)){
            return ResponseResult.ofSuccess("unauthorized user", null);
        }

        if(!placeReviewService.isFirstReview(placeReviewDto)){
            return ResponseResult.ofSuccess("already registered", null);
        }

        placeReviewService.addPlarceReview(placeReviewDto);
        return ResponseResult.ofSuccess("success", null);
    }

    /**
     * 여행 장소 리뷰 수정
     * @param placeReviewDto
     * @return
     */
    @PutMapping
    public ResponseResult<?> updatePlaceReview(@RequestBody PlaceReviewDto placeReviewDto) {
        Integer custNo = findAuthorizedUser.findUser().get().getCustNo();
        if ( !placeReviewDto.getCustNo().equals(custNo)) {
            return ResponseResult.ofSuccess("unauthorized user", null);
        }
        if(!placeReviewService.isCustNoEquals(placeReviewDto.getTripDetailNo(), custNo)){
            return ResponseResult.ofSuccess("unauthorized user", null);
        }

        placeReviewService.updatePlaceReveiw(placeReviewDto);

        return ResponseResult.ofSuccess("success", null);
    }


    /**
     * 여행 장소 리뷰 삭제
      * @param placeReviewNo
     * @return
     */
    @DeleteMapping
    public ResponseResult<?> deletePlaceReview(@RequestParam Integer placeReviewNo) {
        Integer custNo = findAuthorizedUser.findUser().get().getCustNo();
        placeReviewService.deleteReview(placeReviewNo);
        return ResponseResult.ofSuccess("success", null);
    }

}
