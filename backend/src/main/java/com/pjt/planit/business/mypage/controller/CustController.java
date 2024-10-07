package com.pjt.planit.business.mypage.controller;

import com.pjt.planit.business.mypage.dto.*;
import com.pjt.planit.business.mypage.service.UserInfoService;
import com.pjt.planit.core.config.ApiResponse;
import com.pjt.planit.business.mypage.service.UserReplysService;
import com.pjt.planit.business.mypage.service.UserReviewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/my-page")
public class CustController {

    private final UserInfoService userInfoService;
    private final UserReplysService userReplysService;
    private final UserReviewsService userReviewsService;

    //개인정보 불러오기
    @GetMapping("/{custNo}")
    public ApiResponse UserInfo(@PathVariable Integer custNo) {
        CustInfoDto list = userInfoService.userInfo(custNo);
        return ApiResponse.ok("ok", list);
    }


    @PutMapping("/update")
    public ApiResponse updateUserInfo(@RequestBody CustInfoDto dto) {
        Boolean isExist = userInfoService.nickNameCheck(dto.getNickname());
        if (isExist) {
            return ApiResponse.ok("닉네임 중복");
        }

        //token 인증값에서 user email 가지고 옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        dto.setEmail(email);
        userInfoService.updateUserInfo(dto);
        return ApiResponse.ok("ok");
    }

    //이메일체크
    @PostMapping("/check")
    public ApiResponse emailCheck(@RequestParam String nickName) {
        Boolean check = userInfoService.nickNameCheck(nickName);
        return ApiResponse.ok("ok",check);
    }

    //내가 작성한 댓글 조회
    @GetMapping("/replys/{custNo}")
    public ApiResponse replys(@PathVariable Integer custNo,
                              @RequestParam(defaultValue = "0") Integer page,
                              @RequestParam(defaultValue = "10") Integer size) {
        List<ReplyListDto> list = userReplysService.replyList(custNo, page, size);
        return ApiResponse.ok("ok",list);
    }

    //내가 작성한 댓글 삭제
    @DeleteMapping("/replys/delete")
    public ApiResponse deleteReplys(@RequestBody ReplyListDeleteDto dto) {
        userReplysService.replyListDelete(dto);
        return ApiResponse.ok("ok");
    }

    //내가 작성한 리뷰 조회
    @GetMapping("/reviews/{custNo}")
    public ApiResponse reviews(@PathVariable Integer custNo,
                               @RequestParam(defaultValue = "0") Integer page,
                               @RequestParam(defaultValue = "7") Integer size) {
        List<ReviewListDto> list = userReviewsService.reviewList(custNo, page, size);
        return ApiResponse.ok("ok",list);
    }

    //내가 작성한 리뷰 삭제
    @DeleteMapping("/review/delete")
    public ApiResponse deleteReview(@RequestBody Map<String,Integer> params) {
        Integer placeReviewNo = params.get("placeReviewNo");
        userReviewsService.reviewDelete(placeReviewNo);
        return ApiResponse.ok("ok");
    }

    //수정버튼 누를때 보이는 리뷰 디테일
    @GetMapping("/review/{placeReviewNo}")
    public ApiResponse retrieveReview(@PathVariable Integer placeReviewNo) {
        ReviewRetrieveDto list = userReviewsService.reviewDetail(placeReviewNo);
        return ApiResponse.ok("ok", list);
    }

    //리뷰 수정 완료
    @PutMapping("/review/{placeReviewNo}")
    public ApiResponse updateReview(@PathVariable Integer placeReviewNo, @RequestBody ReviewRetrieveDto dto) {
        //userReviewsService.updateReview(placeReviewNo, dto)
        return ApiResponse.ok("ok");
    }
}
