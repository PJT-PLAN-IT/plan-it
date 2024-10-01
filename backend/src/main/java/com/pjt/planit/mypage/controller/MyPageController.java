package com.pjt.planit.mypage.controller;

import com.pjt.planit.mypage.dto.FindMateDto;
import com.pjt.planit.mypage.dto.MyMateApplyUpdateDto;
import com.pjt.planit.mypage.dto.TripMateDto;
import com.pjt.planit.mypage.service.MyMateApplyService;
import com.pjt.planit.mypage.service.MyMateListService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/my/mates")
public class MyPageController {

    private final MyMateListService myMateListService;
    private final MyMateApplyService myMateApplyService;

    @GetMapping("/{id}")
    public ApiResponse myMateList(@PathVariable Integer id, @RequestParam Integer year) {
        List<FindMateDto> list = myMateListService.myMateList(id, year);
        return ApiResponse.ok(list);
    }

    @PostMapping("/approval")
    public ApiResponse applyUpdate(@RequestBody MyMateApplyUpdateDto dto) {
        myMateListService.applyUpdate(dto);
        return ApiResponse.ok();
    }

    @GetMapping("/apply/{id}")
    public ApiResponse MateApply(@PathVariable Integer id, @RequestParam Integer year) {
        List<FindMateDto> list = myMateApplyService.mateApply(id, year);
        return ApiResponse.ok(list);
    }

    @PostMapping("/apply/secession")
    public ApiResponse applySecession(@RequestBody TripMateDto dto) {
        myMateApplyService.applySecession(dto);
        return ApiResponse.ok();
    }

    @GetMapping("/likes")
    public ApiResponse mateListLikes(@RequestParam Integer year) {
        return ApiResponse.ok();
    }
}
