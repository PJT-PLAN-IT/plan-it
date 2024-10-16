package com.pjt.planit.business.mate.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pjt.planit.business.mate.dto.MateListDTO;
import com.pjt.planit.business.mate.mapper.MateListMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MateListService {

	private final MateListMapper listMapper;

	private final MateListMapper mateListMapper;



	/**
	 * 메이트 공고리스트 전체 출력
	 * @return
	 */
	public Page<MateListDTO> getMateList(Pageable pageable) {
		
		MateListDTO mateListDTO = new MateListDTO();
		List<MateListDTO> list = mateListMapper.getMateList(mateListDTO);
		
		for (MateListDTO listDTO : list) {
			listDTO.setThumbnailImg(listDTO.getThumbnailImg());
			listDTO.getRegionsList();
			listDTO.getTripStylesList();
		}
		List<MateListDTO> tripMateNum = mateListMapper.getTripMateNum(mateListDTO);

		for (MateListDTO t : tripMateNum) {
			Integer tripPlanNoT = t.getTripPlanNo();
			if (tripPlanNoT != null) {
				for (MateListDTO l : list) {
					Integer tripPlanNoL = l.getTripPlanNo();
					if (tripPlanNoL != null && tripPlanNoL.equals(tripPlanNoT)) {
						l.setTripMateNum(t.getTripMateNum());
						break;
					}
				}
			}
		}
		
		int start = (int) pageable.getOffset();
		int end = Math.min(start + pageable.getPageSize(), list.size());
		List<MateListDTO> paginatedList = list.subList(start, end);
		
		return new PageImpl(paginatedList, pageable, list.size());
	}


}
