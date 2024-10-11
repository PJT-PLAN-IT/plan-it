package com.pjt.planit.business.mate.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.pjt.planit.business.mate.dto.MateDetailDTO;
import com.pjt.planit.business.mate.mapper.DetailMapper;
import com.pjt.planit.business.tripplan.dto.TripPlanDto;
import com.pjt.planit.business.tripplan.mapper.PlanMapper;
import com.pjt.planit.db.entity.FindMateRegion;
import com.pjt.planit.db.entity.FindMateReply;
import com.pjt.planit.db.entity.FindMateStyle;
import com.pjt.planit.db.repository.FindMateRegionRepository;
import com.pjt.planit.db.repository.FindMateRepository;
import com.pjt.planit.db.repository.FindMateStyleRepository;
import jakarta.transaction.Transactional;

@Service
public class MateDetailService {

	private final FindMateRepository mateRepository;
	private final FindMateStyleRepository styleRepository;
	private final FindMateRegionRepository regionRepository;
	private final DetailMapper detailMapper;
	private final PlanMapper planMapper;

	public MateDetailService(FindMateRepository mateRepository, FindMateStyleRepository styleRepository,
			FindMateRegionRepository regionRepository, DetailMapper detailMapper, PlanMapper planMapper) {
		this.mateRepository = mateRepository;
		this.styleRepository = styleRepository;
		this.regionRepository = regionRepository;
		this.detailMapper = detailMapper;
		this.planMapper = planMapper;
	}

	public MateDetailDTO getDetail(int findMateNo) {

		MateDetailDTO detailDTO = new MateDetailDTO();
		detailDTO.setFindMateNo(findMateNo);
		detailDTO = detailMapper.getDetail(detailDTO);
		int tripPlanNo = detailDTO.getTripPlanNo();
		TripPlanDto tripPlanDto = new TripPlanDto();
		tripPlanDto.setTripPlanNo(tripPlanNo);
		tripPlanDto = planMapper.getPlanDetail(tripPlanDto);
		detailDTO.setTripPlanList(detailMapper.getTripPlan(tripPlanDto));
		detailDTO.setTripPlanDetailList(planMapper.getDetailList(tripPlanDto));
		detailDTO.setMateReplyList(detailMapper.getMateReply(findMateNo));
		return detailDTO;

	}

	public void editDetail(MateDetailDTO detailDTO) {

		detailMapper.editDetail(detailDTO);
		updateRegions(detailDTO);
		updateStyles(detailDTO);

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

	}

}