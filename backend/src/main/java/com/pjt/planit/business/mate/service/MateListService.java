package com.pjt.planit.business.mate.service;
import java.util.List;

import com.pjt.planit.business.mate.mapper.MateListMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.pjt.planit.business.mate.dto.MateListDTO;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MateListService {

	private final MateListMapper mateListMapper;

	@Value("${file.fileDir}")
	private String fileDir;

	/**
	 * 메이트 공고리스트 전체 출력
	 * @return
	 */
	public List<MateListDTO> getMateList() {
		MateListDTO mateListDTO = new MateListDTO();
		List<MateListDTO> list = mateListMapper.getMateList(mateListDTO);
		for (MateListDTO listDTO : list) {
			listDTO.setThumbnailImg(fileDir + listDTO.getThumbnailImg());
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
		return list;
	}

}
