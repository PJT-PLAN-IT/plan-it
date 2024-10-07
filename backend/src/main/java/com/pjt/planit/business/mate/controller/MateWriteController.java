package com.pjt.planit.business.mate.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pjt.planit.business.mate.dto.MateWriteDTO;
import com.pjt.planit.business.mate.service.MateWriteService;
import com.pjt.planit.core.config.ApiResponse;





@RestController
@RequestMapping("/mate")
public class MateWriteController {
	
	@Autowired
	private MateWriteService mateWriteService;
	
	@PostMapping
	public ApiResponse submitForm(@RequestBody MateWriteDTO writeDTO ) {
			
		System.out.println(writeDTO);
		
		mateWriteService.saveMateForm(writeDTO);
		return ApiResponse.ok("공고 등록 완료");

		
	}

}
