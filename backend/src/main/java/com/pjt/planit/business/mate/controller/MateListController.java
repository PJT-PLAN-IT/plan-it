package com.pjt.planit.business.mate.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.*;
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
	 * 메이트 공고 전체리스트
	 */
	@GetMapping
	public ApiResponse getMateList() {
		List<MateListDTO> list = mateListService.getMateList();
		return ApiResponse.ok("ok", list);
	}

}
