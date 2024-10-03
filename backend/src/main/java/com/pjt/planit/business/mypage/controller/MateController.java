package com.pjt.planit.business.mypage.controller;

import com.pjt.planit.business.mypage.dto.*;
import com.pjt.planit.business.mypage.service.MateApplyService;
import com.pjt.planit.business.mypage.service.MateLikesService;
import com.pjt.planit.business.mypage.service.MateListWriteService;
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

    @GetMapping("/{custNo}")
    public ApiResponse myMateList(@PathVariable Integer custNo, @RequestParam Integer year) {
        List<MateListWriteDto> list = myMateListService.myMateList(custNo, year);
        return ApiResponse.ok(list);
    }

    @PostMapping("/approval")
    public ApiResponse applyUpdate(@RequestBody MateApplyUpdateDto dto) {
        myMateListService.applyUpdate(dto);
        return ApiResponse.ok();
    }

    @GetMapping("/apply/{custNo}")
    public ApiResponse MateApply(@PathVariable Integer custNo, @RequestParam Integer year) {
        List<MateListSubDto> list = myMateApplyService.mateApply(custNo, year);
        return ApiResponse.ok(list);
    }

    @PostMapping("/apply/secession")
    public ApiResponse applySecession(@RequestBody TripMateDto dto) {
        myMateApplyService.applySecession(dto);
        return ApiResponse.ok();
    }

    @GetMapping("/likes/{custNo}")
    public ApiResponse mateListLikes(@PathVariable Integer custNo, @RequestParam Integer year) {
        List<MateListLikeDto> list = myMateLikesService.mateListLikes(custNo, year);
        return ApiResponse.ok(list);
    }

    @PostMapping("/like/revoke")
    public ApiResponse likeRevoke(@RequestBody MateLikeRevokeDto dto) {
        myMateLikesService.likeRevoke(dto);
        return ApiResponse.ok();
    }
}
