package com.pjt.planit.business.mate.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pjt.planit.business.mate.dto.MateDetailDTO;
import com.pjt.planit.business.mate.dto.MateLikeDTO;
import com.pjt.planit.business.mate.dto.ReplyGroupDTO;
import com.pjt.planit.business.mate.mapper.MateDetailMapper;
import com.pjt.planit.business.tripplan.dto.TripPlanDto;
import com.pjt.planit.business.tripplan.mapper.PlanMapper;
import com.pjt.planit.db.entity.FindMateLike;
import com.pjt.planit.db.entity.FindMateRegion;
import com.pjt.planit.db.entity.FindMateReply;
import com.pjt.planit.db.entity.FindMateStyle;
import com.pjt.planit.db.repository.FindMateLikeRepository;
import com.pjt.planit.db.repository.FindMateRegionRepository;
import com.pjt.planit.db.repository.FindMateRepository;
import com.pjt.planit.db.repository.FindMateStyleRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class MateDetailService {

	private final FindMateRepository mateRepository;
	private final FindMateStyleRepository styleRepository;
	private final FindMateRegionRepository regionRepository;
	private final FindMateLikeRepository findMateLikeRepository;
	private final MateDetailMapper detailMapper;
	private final PlanMapper planMapper;

	@Autowired
	public MateDetailService(FindMateRepository mateRepository, FindMateStyleRepository styleRepository,
			FindMateRegionRepository regionRepository, MateDetailMapper detailMapper, PlanMapper planMapper, FindMateLikeRepository findMateLikeRepository ) {
		this.mateRepository = mateRepository;
		this.styleRepository = styleRepository;
		this.regionRepository = regionRepository;
		this.detailMapper = detailMapper;
		this.planMapper = planMapper;
		this.findMateLikeRepository = findMateLikeRepository;
	}

	public MateDetailDTO getDetail(MateDetailDTO dto) {
		MateDetailDTO detailDTO = detailMapper.getDetail(dto);
		List<Integer> regions = regionRepository.findContentTypeIdsByFindMateNo(dto.getFindMateNo());
		List<Integer> styles = styleRepository.findTripStyleIdsByFindMateNo(dto.getFindMateNo());
		System.out.println(regions);
		System.out.println(styles);
		detailDTO.setRegions(regions);
		detailDTO.setTripStyles(styles);

		if (detailDTO.getTripPlanNo() != null) {
			int tripPlanNo = detailDTO.getTripPlanNo();
			TripPlanDto tripPlanDto = new TripPlanDto();
			tripPlanDto.setTripPlanNo(tripPlanNo);
			tripPlanDto = planMapper.getPlanDetail(tripPlanDto);
			detailDTO.setTripPlanList(detailMapper.getTripPlan(tripPlanDto));
			detailDTO.setTripPlanDetailList(planMapper.getDetailList2(tripPlanDto));
		}

		System.out.println(detailDTO.getTripPlanList());
		System.out.println(detailDTO.getTripPlanDetailList());

		return detailDTO;

	}

	public int editDetail(MateDetailDTO detailDTO) {

		detailMapper.editDetail(detailDTO);
		updateRegions(detailDTO);
		updateStyles(detailDTO);
		return detailDTO.getFindMateNo();

	}

	@Transactional
	public void updateRegions(MateDetailDTO detailDTO) {

		Integer findMateNo = detailDTO.getFindMateNo();
		List<Integer> newRegions = detailDTO.getRegions();
		List<FindMateRegion> oldRegions = regionRepository.findByFindMateNo(findMateNo);

		List<Integer> oldRegionContentId = oldRegions.stream().map(FindMateRegion::getContentTypeId)
				.collect(Collectors.toList());

		List<Integer> regionInsert = newRegions.stream().filter(region -> !oldRegionContentId.contains(region))
				.collect(Collectors.toList());

		List<Integer> regionDelete = oldRegionContentId.stream().filter(region -> !newRegions.contains(region))
				.collect(Collectors.toList());

		for (Integer region : regionInsert) {
			FindMateRegion findMateRegion = FindMateRegion.builder().findMateNo(findMateNo).contentTypeId(region)
					.build();
			regionRepository.save(findMateRegion);
		}

		for (Integer region : regionDelete) {
			regionRepository.deleteByFindMateNoAndContentTypeId(findMateNo, region);
		}

	}

	@Transactional
	public void updateStyles(MateDetailDTO detailDTO) {

		Integer findMateNo = detailDTO.getFindMateNo();
		List<Integer> newStyles = detailDTO.getTripStyles();
		List<FindMateStyle> oldStyles = styleRepository.findByFindMateNo(findMateNo);

		List<Integer> oldStyleContentId = oldStyles.stream().map(FindMateStyle::getTripStyleId)
				.collect(Collectors.toList());

		List<Integer> styleInsert = newStyles.stream().filter(style -> !oldStyleContentId.contains(style))
				.collect(Collectors.toList());

		List<Integer> styleDelete = oldStyleContentId.stream().filter(style -> !newStyles.contains(style))
				.collect(Collectors.toList());

		for (Integer style : styleInsert) {
			FindMateStyle findMateStyle = FindMateStyle.builder().findMateNo(findMateNo).tripStyleId(style).build();
			styleRepository.save(findMateStyle);
		}

		for (Integer style : styleDelete) {
			styleRepository.deleteByFindMateNoAndTripStyleId(findMateNo, style);
		}

	}

	@Transactional
	public void deleteDetail(int findMateNo) {

		mateRepository.deleteByFindMateNo(findMateNo);
		regionRepository.deleteAllByFindMateNo(findMateNo);
		styleRepository.deleteAllByFindMateNo(findMateNo);
		findMateLikeRepository.deleteAllByFindMateNo(findMateNo);

	}
	
	@Transactional
	public void addMateLike(MateLikeDTO likeDTO) {
		 FindMateLike existLike = findMateLikeRepository.findByFindMateNoAndCustNo(
			        likeDTO.getFindMateNo(), likeDTO.getCustNo()
			    );

		 if (existLike == null) {
			  FindMateLike newLike = new FindMateLike();
		        newLike.setFindMateNo(likeDTO.getFindMateNo());
		        newLike.setCustNo(likeDTO.getCustNo());
		        
		        findMateLikeRepository.save(newLike);
		    } 

	}
	
	@Transactional
	public void removeMatelike(MateLikeDTO likeDTO) {
	    FindMateLike existingLike = findMateLikeRepository.findByFindMateNoAndCustNo(
	        likeDTO.getFindMateNo(), likeDTO.getCustNo()
	    );

	    if (existingLike != null) {
	        findMateLikeRepository.delete(existingLike);
	    } else {
	        throw new EntityNotFoundException("MateLike not found");
	    }
	}

}
