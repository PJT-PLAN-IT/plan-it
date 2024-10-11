package com.pjt.planit.business.mate.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pjt.planit.business.mate.dto.MateListDTO;
import com.pjt.planit.business.mate.service.MateListService;
import com.pjt.planit.core.config.ApiResponse;
import lombok.RequiredArgsConstructor;

@RequestMapping("/planit/mates")
@RestController
@RequiredArgsConstructor
public class MateListController {

	private final MateListService mateListService;
	
	/**
	 * 기본 로드 페이지
	 * **/
	
	@GetMapping
	public ApiResponse getMateList() {

		List<MateListDTO> mateList = new ArrayList<>();
		mateList = mateListService.getMateList();
		return ApiResponse.ok("", mateList);
	}
	
	/**
	 * 필터링 후 페이지
	 * **/
	@PostMapping
	public ApiResponse getMateList(@RequestBody MateListDTO dto) {
		
		List<MateListDTO> mateList = new ArrayList<>();
		mateList = mateListService.getMateList(dto);
		return ApiResponse.ok("", mateList);
	}
}
