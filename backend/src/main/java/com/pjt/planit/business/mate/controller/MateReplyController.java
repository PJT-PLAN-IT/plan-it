package com.pjt.planit.business.mate.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pjt.planit.business.mate.dto.MateReplyDTO;
import com.pjt.planit.business.mate.service.MateReplyService;
import com.pjt.planit.core.config.ApiResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mate/reply")
@RequiredArgsConstructor
public class MateReplyController {

	private final MateReplyService mateReplyService;
	
	/**
	 * 공고 댓글 작성
	 * **/
	@PostMapping
	public ApiResponse submitReply(@RequestBody MateReplyDTO replyDTO) {

		mateReplyService.submitReply(replyDTO);
		return ApiResponse.ok("submit reply");
	}

	/**
	 * 공고 댓글 수정
	 * **/	
	@PutMapping
	public ApiResponse editReply(@RequestBody MateReplyDTO replyDTO) {
		
		mateReplyService.editReply(replyDTO);
		return ApiResponse.ok("edit reply");
	}
	
	/**
	 * 공고 댓글 삭제
	 * **/
	@DeleteMapping
	public ApiResponse deleteReply(@RequestBody MateReplyDTO dto) {
		mateReplyService.deleteReply(dto);
		return ApiResponse.ok("comment deleted");
	}

}
