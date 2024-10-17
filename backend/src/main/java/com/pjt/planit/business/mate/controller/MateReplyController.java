package com.pjt.planit.business.mate.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.pjt.planit.business.mate.dto.MateReplyDTO;
import com.pjt.planit.business.mate.service.MateReplyService;
import com.pjt.planit.core.config.ApiResponse;
import com.pjt.planit.db.entity.FindMateReply;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mate/reply")
@RequiredArgsConstructor
public class MateReplyController {

	private final MateReplyService mateReplyService;

	/**
	 * 공고 댓글 가져오기
	 **/
	
//	@GetMapping
//	public ApiResponse getRepliesByFindMateNo(@RequestParam("findMateNo") int findMateNo) {
//		List<FindMateReply> replies = mateReplyService.getRepliesByFindMateNo(findMateNo);
//		System.out.println("replies");
//		System.out.println(replies);
//		return  ApiResponse.ok("sent replies", replies);
//	}

	@GetMapping
	public ApiResponse getReplies(@RequestParam("findMateNo") int findMateNo) {
		
		List<MateReplyDTO> replies = mateReplyService.getReplies(findMateNo);
		
		return ApiResponse.ok("replies", replies);
		
	}
	
	
	/**
	 * 공고 댓글 작성
	 **/
	@PostMapping
	public ApiResponse submitReply(@RequestBody MateReplyDTO replyDTO) {
		System.out.println(replyDTO);
		int replyNo = mateReplyService.submitReply(replyDTO);
		return ApiResponse.ok("submit reply", replyNo);
	}

	/**
	 * 공고 댓글 수정
	 **/
	@PutMapping
	public ApiResponse editReply(@RequestBody MateReplyDTO replyDTO) {
		System.out.println(replyDTO);
		mateReplyService.editReply(replyDTO);
		return ApiResponse.ok("edit reply");
	}

	/**
	 * 공고 댓글 삭제
	 **/
	@DeleteMapping
	public ApiResponse deleteReply(@RequestParam("findMateReplyNo") int findMateReplyNo) {
		mateReplyService.deleteReply(findMateReplyNo);
		return ApiResponse.ok("comment deleted");
	}

}
