package com.pjt.planit.business.mate.controller;
import org.springframework.web.bind.annotation.*;
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
    public ApiResponse showDetail(@RequestParam("findMateNo") int findMateNo) {
		MateDetailDTO result = detailService.getDetail(findMateNo);
		return ApiResponse.ok("sent detail", result);
   }
}
