package com.pjt.planit.business.mypage.controller;

import com.pjt.planit.business.mypage.dto.*;
import com.pjt.planit.business.mypage.service.MateApplyService;
import com.pjt.planit.business.mypage.service.MateLikesService;
import com.pjt.planit.business.mypage.service.MateListWriteService;
import com.pjt.planit.core.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/my/mates")
public class MateController {

    private final MateListWriteService myMateListService;
    private final MateApplyService myMateApplyService;
    private final MateLikesService myMateLikesService;

    //내가 작성한 메이트글 조회
    @GetMapping("/{custNo}")
    public ApiResponse myMateList(@PathVariable Integer custNo, @RequestParam Integer year) {
        List<MateListWriteDto> list = myMateListService.myMateList(custNo, year);
        return ApiResponse.ok("ok", list);
    }

    //내가 등록한 메이트글 승인, 거절
    @PostMapping("/approval")
    public ApiResponse applyUpdate(@RequestBody MateApplyUpdateDto dto) {
        myMateListService.applyUpdate(dto);
        return ApiResponse.ok("ok");
    }

    //내가 신청한 메이트글 조회
    @GetMapping("/apply/{custNo}")
    public ApiResponse MateApply(@PathVariable Integer custNo, @RequestParam Integer year) {
        List<MateListSubDto> list = myMateApplyService.mateApply(custNo, year);
        return ApiResponse.ok("ok",list);
    }

    //확정된 메이트글 탈퇴
    @PostMapping("/apply/secession")
    public ApiResponse applySecession(@RequestBody TripMateSecessionDto dto) {
        myMateApplyService.applySecession(dto);
        return ApiResponse.ok("ok");
    }

    //신청한 메이트글 취소
    @PostMapping("/apply/cancel")
    public ApiResponse applyCancel(@RequestBody TripMateCancelDto dto) {
        myMateApplyService.applyCancel(dto);
        return ApiResponse.ok("ok");
    }

    //좋아요한 메이트글 조회
    @GetMapping("/likes/{custNo}")
    public ApiResponse mateListLikes(@PathVariable Integer custNo, @RequestParam Integer year) {
        List<MateListLikeDto> list = myMateLikesService.mateListLikes(custNo, year);
        return ApiResponse.ok("ok", list);
    }

    //좋아요 취소
    @PostMapping("/like/revoke")
    public ApiResponse likeRevoke(@RequestBody MateLikeRevokeDto dto) {
        myMateLikesService.likeRevoke(dto);
        return ApiResponse.ok("ok");
    }
}
