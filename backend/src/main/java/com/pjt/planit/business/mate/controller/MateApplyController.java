package com.pjt.planit.business.mate.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pjt.planit.business.mate.dto.MateApplyDTO;
import com.pjt.planit.business.mate.service.MateApplyReqService;
import com.pjt.planit.core.config.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mate/participate")
@RequiredArgsConstructor
public class MateApplyController {

	private final MateApplyReqService mateApplyService;
	
	/**
	 * 공고 여행 신청
	 * **/
	
	@PostMapping
	public ApiResponse mateApplyReq(@RequestBody MateApplyDTO mateApplyDTO) {
		
		System.out.println(mateApplyDTO);
		mateApplyService.mateApplyReq(mateApplyDTO);
		return ApiResponse.ok("참여 신청 완료");
	}
	
	/**
	 * 공고 여행 취소
	 * **/
	@DeleteMapping
	public ApiResponse mateApplyCnl(@RequestBody MateApplyDTO mateApplyDTO) {
		
		mateApplyService.mateApplyCnl(mateApplyDTO);
		return ApiResponse.ok("application cancelled");
	}
	
	
}
