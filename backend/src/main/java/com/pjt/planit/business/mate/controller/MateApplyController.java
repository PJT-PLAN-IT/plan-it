package com.pjt.planit.business.mate.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pjt.planit.business.mate.dto.MateApplyDTO;
import com.pjt.planit.business.mate.dto.TripMateNumDTO;
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
	 **/
	@GetMapping
	public ApiResponse mateApplyGet(@RequestParam("findMateNo") int findMateNo, @RequestParam("custNo") int custNo) {

		System.out.println("findMateNo");
		System.out.println(findMateNo);
		System.out.println("custNo");
		System.out.println(custNo);
		boolean mateApplyStat = mateApplyService.mateApplyGet(findMateNo, custNo);

		return ApiResponse.ok("here is apply info", mateApplyStat);
	}
	
	@GetMapping("/getMateNum")
	public ResponseEntity<List<TripMateNumDTO>> getMateNum(@RequestParam("tripPlanNo") int tripPlanNo) {
		List<TripMateNumDTO> customers = mateApplyService.getMateNum(tripPlanNo);
	    return ResponseEntity.ok(customers);
	}
	
	
	@PostMapping
	public ApiResponse mateApplyReq(@RequestBody MateApplyDTO mateApplyDTO) {

//		System.out.println(mateApplyDTO);
		mateApplyService.mateApplyReq(mateApplyDTO);
		return ApiResponse.ok("참여 신청 완료");
	}

	/**
	 * 공고 여행 취소
	 **/
	@PostMapping("/cancel")
	public ApiResponse mateApplyCnl(@RequestBody MateApplyDTO mateApplyDTO) {
		System.out.println(mateApplyDTO);
		mateApplyService.mateApplyCnl(mateApplyDTO);
		return ApiResponse.ok("application cancelled");
	}

}
