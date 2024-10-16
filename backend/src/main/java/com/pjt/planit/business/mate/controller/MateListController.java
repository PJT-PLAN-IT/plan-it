package com.pjt.planit.business.mate.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
	public ApiResponse getMateList(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {

		Pageable pageable = PageRequest.of(page, size);
		
		Page<MateListDTO> listPage = mateListService.getMateList(pageable);
		
		
		return ApiResponse.ok("ok", listPage);
	}

}
