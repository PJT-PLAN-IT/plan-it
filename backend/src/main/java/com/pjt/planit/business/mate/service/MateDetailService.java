package com.pjt.planit.business.mate.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.pjt.planit.business.mate.dto.MateDetailDTO;
import com.pjt.planit.business.mate.dto.ReplyGroupDTO;
import com.pjt.planit.business.mate.mapper.MateDetailMapper;
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
	private final MateDetailMapper detailMapper;
	private final PlanMapper planMapper;

	public MateDetailService(FindMateRepository mateRepository, FindMateStyleRepository styleRepository,
			FindMateRegionRepository regionRepository, MateDetailMapper detailMapper, PlanMapper planMapper) {
		this.mateRepository = mateRepository;
		this.styleRepository = styleRepository;
		this.regionRepository = regionRepository;
		this.detailMapper = detailMapper;
		this.planMapper = planMapper;
	}

	public MateDetailDTO getDetail(int findMateNo) {

		MateDetailDTO detailDTO = detailMapper.getDetail(findMateNo);
		List<Integer> regions = regionRepository.findContentTypeIdsByFindMateNo(findMateNo);
		List<Integer> styles = styleRepository.findTripStyleIdsByFindMateNo(findMateNo);
		detailDTO.setRegions(regions);
		detailDTO.setTripStyles(styles);

		if (detailDTO.getTripPlanNo() != null) {
			int tripPlanNo = detailDTO.getTripPlanNo();
			TripPlanDto tripPlanDto = new TripPlanDto();
			tripPlanDto.setTripPlanNo(tripPlanNo);
			tripPlanDto = planMapper.getPlanDetail(tripPlanDto);
			detailDTO.setTripPlanList(detailMapper.getTripPlan(tripPlanDto));
			detailDTO.setTripPlanDetailList(planMapper.getDetailList(tripPlanDto));
		}

//		if (detailMapper.getMateReply(findMateNo) != null) {
////			List<ReplyGroupDTO> groupedReplies = getGroupedReplies(findMateNo);
//			detailDTO.setMateReplyList(detailMapper.getMateReply(findMateNo));
//		}
//
		return detailDTO;

	}

//	public List<ReplyGroupDTO> getGroupedReplies(Integer findMateNo) {
//		// Fetch replies from the database
//		List<Map<String, Object>> replies = detailMapper.getMateReply(findMateNo);
//		System.out.println("Fetched replies: " + replies); // Debugging line
//
//		// Map to hold all replies by their IDs
//		Map<Integer, ReplyGroupDTO> replyMap = new HashMap<>();
//		// List to hold top-level replies
//		List<ReplyGroupDTO> topLevelReplies = new ArrayList<>();
//
//		// First pass to create ReplyGroupDTO objects
//		for (Map<String, Object> replyData : replies) {
//			Integer upperReplyNo = (Integer) replyData.get("upper_find_mate_reply_no");
//			Integer replyNo = (Integer) replyData.get("find_mate_reply_no");
//			String replyContent = (String) replyData.get("reply");
//
//			// Create reply group DTO
//			ReplyGroupDTO replyGroup = replyMap.computeIfAbsent(replyNo, k -> {
//				ReplyGroupDTO dto = new ReplyGroupDTO();
//				dto.setFindMateReplyNo(replyNo);
//				dto.setReply(replyContent); // Ensure that reply content is set
//				dto.setResponses(new ArrayList<>());
//				return dto;
//			});
//
//			// If there is a parent (upper reply), add this reply as a response
//			if (upperReplyNo != null) {
//				// Ensure the parent group exists
//				ReplyGroupDTO parentGroup = replyMap.computeIfAbsent(upperReplyNo, k -> {
//					ReplyGroupDTO dto = new ReplyGroupDTO();
//					dto.setFindMateReplyNo(upperReplyNo);
//					dto.setReply((String) replyData.get("parent_reply")); // Set parent reply content
//					dto.setResponses(new ArrayList<>());
//					return dto;
//				});
//
//				// Add the current reply as a response to the parent
//				parentGroup.getResponses().add(replyGroup);
//			} else {
//				// If there's no parent, this is a top-level reply
//				topLevelReplies.add(replyGroup);
//			}
//		}
//
//		// Return the top-level replies
//		return topLevelReplies;
//	}

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

	}

}
