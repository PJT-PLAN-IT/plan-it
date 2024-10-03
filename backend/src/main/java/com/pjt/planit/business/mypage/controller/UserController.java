package com.pjt.planit.business.mypage.controller;

import com.pjt.planit.business.mypage.dto.*;
import com.pjt.planit.business.mypage.service.UserInfoService;
import com.pjt.planit.business.mypage.service.UserReplysService;
import com.pjt.planit.business.mypage.service.UserReviewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/my-page")
public class UserController {

    private final UserInfoService userInfoService;
    private final UserReplysService userReplysService;
    private final UserReviewsService userReviewsService;

    @GetMapping("/{custNo}")
    public ApiResponse UserInfo(@PathVariable Integer custNo) {
        CustInfoDto list = userInfoService.userInfo(custNo);
        return ApiResponse.ok(list);
    }

    @PostMapping("/update")
    public ApiResponse updateUserInfo(@RequestBody CustInfoDto dto) {
        userInfoService.updateUserInfo(dto);
        return ApiResponse.ok();
    }

    @PostMapping("/check")
    public ApiResponse emailCheck(@RequestParam String nickName) {
        Boolean check = userInfoService.nickNameCheck(nickName);
        return ApiResponse.ok(check);
    }

    @GetMapping("/replys/{custNo}")
    public ApiResponse replys(@PathVariable Integer custNo,
                              @RequestParam(defaultValue = "0") Integer page,
                              @RequestParam(defaultValue = "10") Integer size) {
        List<ReplyListDto> list = userReplysService.replyList(custNo, page, size);
        return ApiResponse.ok(list);
    }

    @DeleteMapping("/replys/delete")
    public ApiResponse deleteReplys(@RequestBody ReplyListDeleteDto dto) {
        userReplysService.replyListDelete(dto);
        return ApiResponse.ok();
    }

    @GetMapping("/reviews/{custNo}")
    public ApiResponse reviews(@PathVariable Integer custNo,
                               @RequestParam(defaultValue = "0") Integer page,
                               @RequestParam(defaultValue = "7") Integer size) {
        List<ReviewListDto> list = userReviewsService.reviewList(custNo, page, size);
        return ApiResponse.ok(list);
    }

    @DeleteMapping("/review/delete")
    public ApiResponse deleteReview(@RequestBody Map<String,Integer> params) {
        Integer placeReviewNo = params.get("placeReviewNo");
        userReviewsService.reviewDelete(placeReviewNo);
        return ApiResponse.ok();
    }

    @GetMapping("/review/{placeReviewNo}")
    public ApiResponse retrieveReview(@PathVariable Integer placeReviewNo) {
        ReviewUpdateDto list = userReviewsService.reviewDetail(placeReviewNo);
        return ApiResponse.ok(list);
    }
}
