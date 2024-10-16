package com.pjt.planit.business.mate.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.pjt.planit.business.mate.dto.MateDetailDTO;
import com.pjt.planit.business.mate.service.MateDetailService;
import com.pjt.planit.core.config.ApiResponse;
import lombok.RequiredArgsConstructor;

@RequestMapping("/planit/mates")
@RestController
@RequiredArgsConstructor
public class MateDetailController {

	private final MateDetailService detailService;

	
	/**
	 * 공고 디테일 보기
	 * **/
	@GetMapping("/details")
	public ApiResponse showDetail(@RequestBody MateDetailDTO detailDTO ) {
		MateDetailDTO result = detailService.getDetail(detailDTO);
		System.out.println(result);
		return ApiResponse.ok("sent detail", result);
	}


}
