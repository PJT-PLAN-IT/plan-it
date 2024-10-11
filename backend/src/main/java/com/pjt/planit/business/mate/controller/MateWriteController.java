package com.pjt.planit.business.mate.controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.pjt.planit.business.mate.dto.MateDetailDTO;
import com.pjt.planit.business.mate.dto.MateWriteDTO;
import com.pjt.planit.business.mate.service.MateDetailService;
import com.pjt.planit.business.mate.service.MateWriteService;
import com.pjt.planit.core.config.ApiResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mate")
@RequiredArgsConstructor
public class MateWriteController {

	private final MateWriteService mateWriteService;
	private final MateDetailService detailService;
	
	/**
	 * 공고 작성
	 * **/
	@PostMapping
	public ApiResponse submitForm(@RequestBody MateWriteDTO writeDTO) {

		System.out.println(writeDTO);

		int findMateNo = mateWriteService.saveMateForm(writeDTO);
		return ApiResponse.ok("공고 등록 완료", findMateNo);

	}
	/**
	 * 공고 수정
	 * **/
	@PutMapping
	public ApiResponse editDetail(@RequestBody MateDetailDTO detailDTO) {

		detailService.editDetail(detailDTO);
		return ApiResponse.ok("공고 수정 완료");
	}

	/**
	 * 공고 삭제
	 * **/
	@DeleteMapping
	public ApiResponse deleteDetail(@RequestParam("findMateNo") int findMateNo) {

		detailService.deleteDetail(findMateNo);
		return ApiResponse.ok("");
	}

}
