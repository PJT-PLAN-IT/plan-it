package com.pjt.planit.business.mate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import com.pjt.planit.business.ImageConverter.ImageController;
import com.pjt.planit.business.mate.dto.MateWriteDTO;
import com.pjt.planit.db.entity.FindMate;
import com.pjt.planit.db.entity.FindMateRegion;
import com.pjt.planit.db.entity.FindMateStyle;
import com.pjt.planit.db.repository.FindMateRegionRepository;
import com.pjt.planit.db.repository.FindMateRepository;
import com.pjt.planit.db.repository.FindMateStyleRepository;

@Service
public class MateWriteService {
	@Autowired
	private FindMateRepository findMateRepository;

	@Autowired
	private FindMateRegionRepository findMateRegionRepository;

	@Autowired
	private FindMateStyleRepository findMateStyleRepository;

	public int saveMateForm(MateWriteDTO writeDTO) {

		FindMate findMate = new FindMate();
		findMate.setTitle(writeDTO.getTitle());
		findMate.setStartDt(writeDTO.getStartDate());
		findMate.setEndDt(writeDTO.getEndDate());
		findMate.setRecruits(writeDTO.getMateNum());
		findMate.setContent(writeDTO.getContent());
		findMate.setGenderType(writeDTO.getGender());
		findMate.setThumbnailImg(writeDTO.getThumbnail());
		findMate.setTwentyYn(writeDTO.getTwentyYN());
		findMate.setThirtyYn(writeDTO.getThirtyYN());
		findMate.setFortyYn(writeDTO.getFortyYN());
		findMate.setFiftyYn(writeDTO.getFiftyYN());
		findMateRepository.save(findMate);

		for (Integer regionId : writeDTO.getRegions()) {
			FindMateRegion region = new FindMateRegion();
			region.setFindMateNo(findMate.getFindMateNo());
			region.setContentTypeId(regionId);
			findMateRegionRepository.save(region);
		}

		for (Integer styleId : writeDTO.getTripStyles()) {
			FindMateStyle style = new FindMateStyle();
			style.setFindMateNo(findMate.getFindMateNo());
			style.setTripStyleId(styleId);
			findMateStyleRepository.save(style);
		}

		int savedNo = findMate.getFindMateNo();
		System.out.println("findMAteNo: " + savedNo);
		return savedNo;
	}

}
