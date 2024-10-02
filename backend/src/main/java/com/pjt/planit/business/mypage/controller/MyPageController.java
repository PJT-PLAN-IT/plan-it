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
public class MyPageController {

    private final MateListWriteService myMateListService;
    private final MateApplyService myMateApplyService;
    private final MateLikesService myMateLikesService;

    @GetMapping("/{id}")
    public ApiResponse myMateList(@PathVariable Integer id, @RequestParam Integer year) {
        List<MateListWriteDto> list = myMateListService.myMateList(id, year);
        return ApiResponse.ok(list);
    }

    @PostMapping("/approval")
    public ApiResponse applyUpdate(@RequestBody MateApplyUpdateDto dto) {
        myMateListService.applyUpdate(dto);
        return ApiResponse.ok();
    }

    @GetMapping("/apply/{id}")
    public ApiResponse MateApply(@PathVariable Integer id, @RequestParam Integer year) {
        List<MateListSubDto> list = myMateApplyService.mateApply(id, year);
        return ApiResponse.ok(list);
    }

    @PostMapping("/apply/secession")
    public ApiResponse applySecession(@RequestBody TripMateDto dto) {
        myMateApplyService.applySecession(dto);
        return ApiResponse.ok();
    }

    @GetMapping("/likes/{id}")
    public ApiResponse mateListLikes(@PathVariable Integer id, @RequestParam Integer year) {
        List<MateListLikeDto> list = myMateLikesService.mateListLikes(id, year);
        return ApiResponse.ok(list);
    }
}
