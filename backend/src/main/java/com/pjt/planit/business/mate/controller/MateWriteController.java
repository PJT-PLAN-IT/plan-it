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
import com.pjt.planit.business.mate.dto.MateDetailDTO;
import com.pjt.planit.business.mate.dto.MateLikeDTO;
import com.pjt.planit.business.mate.dto.MateWriteDTO;
import com.pjt.planit.business.mate.service.MateDetailService;
import com.pjt.planit.business.mate.service.MateFetchTripService;
import com.pjt.planit.business.mate.service.MateWriteService;
import com.pjt.planit.core.config.ApiResponse;
import com.pjt.planit.db.entity.TripDetail;
import com.pjt.planit.db.entity.TripPlan;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mate")
@RequiredArgsConstructor
public class MateWriteController {

	private final MateWriteService mateWriteService;
	private final MateDetailService detailService;
	private final MateFetchTripService tripService;

	@GetMapping("/tripplans")
	public ApiResponse fetchMyTrips(@RequestParam("custNo") int custNo) {

		List<TripPlan> mytrips = tripService.getTripPlansByCustNo(custNo);
		System.out.println(mytrips);
		return ApiResponse.ok("got my trips", mytrips);
	}

	@GetMapping("/tripdetails")
	public ApiResponse myTripDetails(@RequestParam("tripPlanNo") int tripPlanNo) {

		List<TripDetail> mytripdetail = tripService.getTripDetailByTripPlanNo(tripPlanNo);
		System.out.println("myTripDetail:");
		System.out.println(mytripdetail);
		return ApiResponse.ok("mytripdetail", mytripdetail);
	}

	/**
	 * 공고 작성
	 **/
	@PostMapping
	public ApiResponse submitForm(@RequestBody MateWriteDTO writeDTO) {

		int findMateNo = mateWriteService.saveMateForm(writeDTO);
		return ApiResponse.ok("공고 등록 완료", findMateNo);

	}

	/**
	 * 공고 수정
	 **/
	@PutMapping
	public ApiResponse editDetail(@RequestBody MateDetailDTO detailDTO) {

		int findMateNo = detailService.editDetail(detailDTO);
		return ApiResponse.ok("공고 수정 완료", findMateNo);
	}

	/**
	 * 공고 삭제
	 **/
	@DeleteMapping
	public ApiResponse deleteDetail(@RequestParam("findMateNo") int findMateNo) {

		detailService.deleteDetail(findMateNo);
		return ApiResponse.ok("");
	}

	
	/**
	 * 공고 좋아요 설정
	 * **/
	@PostMapping("/like")
	public ApiResponse addMateLike(@RequestBody MateLikeDTO likeDTO ) {
		
		detailService.addMateLike(likeDTO);
		
		return ApiResponse.ok("post liked");
	}
	
	@DeleteMapping("/like-revoke")
	public ApiResponse removeMateLike (@RequestParam("findMateNo") int findMateNo, @RequestParam("custNo") int custNo) {
			
		MateLikeDTO likeDTO = new MateLikeDTO();
		likeDTO.setCustNo(custNo);
		likeDTO.setFindMateNo(findMateNo);
		detailService.removeMatelike(likeDTO);
		
		return ApiResponse.ok("post like revoked");
	}
	
	

}
