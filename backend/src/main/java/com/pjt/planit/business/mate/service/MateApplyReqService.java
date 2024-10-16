package com.pjt.planit.business.mate.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pjt.planit.business.mate.dto.MateApplyDTO;
import com.pjt.planit.business.mate.dto.TripMateNumDTO;
import com.pjt.planit.business.mate.mapper.MateListMapper;
import com.pjt.planit.db.entity.FindMateApply;
import com.pjt.planit.db.entity.TripMate;
import com.pjt.planit.db.repository.FindMateApplyRepository;
import com.pjt.planit.db.repository.TripMateRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class MateApplyReqService {

	private final FindMateApplyRepository applyRepository;
	private final TripMateRepository tripMateRepository;
	private final MateListMapper mateListMapper;
	
	@Autowired
	public MateApplyReqService( MateListMapper mateListMapper, FindMateApplyRepository applyRepository, TripMateRepository tripMateRepository) {
		this.applyRepository = applyRepository;
		this.tripMateRepository = tripMateRepository;
		this.mateListMapper = mateListMapper;
	}

	public void mateApplyReq(MateApplyDTO applyDTO) {

		FindMateApply mateApply = new FindMateApply();
		mateApply.setFindMateNo(applyDTO.getFindMateNo());
		mateApply.setCustNo(applyDTO.getCustNo());
		mateApply.setApplyDt(applyDTO.getApplyDt());
		mateApply.setExpiredDt(applyDTO.getExpiredDt());
		applyRepository.save(mateApply);

	}

	@Transactional
	public void mateApplyCnl(MateApplyDTO mateApplyDTO) {
		Integer findMateNo = mateApplyDTO.getFindMateNo();
		Integer custNo = mateApplyDTO.getCustNo();

		FindMateApply mateApply = applyRepository.findByFindMateNoAndCustNo(findMateNo, custNo);
		if (mateApply != null) {
			String getAllow = mateApply.getAllowYn();
			String getRefuse = mateApply.getRefuseYn();
			Integer applyNo = mateApply.getFindMateApplyNo();
			System.out.println("applyNO: ");
			System.out.println(applyNo);
			if ((getAllow == null && getRefuse == null) || (getAllow.equals("N") && getRefuse.equals("Y"))) {
				applyRepository.deleteById(applyNo);

			} else {
				deleteTripMate(mateApplyDTO);
				applyRepository.deleteById(applyNo);

			}
		}
	}

	@Transactional
	public void deleteTripMate(MateApplyDTO dto) {

		Integer custNo = dto.getCustNo();
		Integer tripPlanNo = dto.getTripPlanNo();
		TripMate tripMate = tripMateRepository.findByTripPlanNoAndCustNo(tripPlanNo, custNo);
		tripMateRepository.deleteById(tripMate.getTripMateNo());
	}

	public boolean mateApplyGet(int findMateNo, int custNo) {

		FindMateApply apply = applyRepository.findByFindMateNoAndCustNo(findMateNo, custNo);

		if (apply == null) {

			return false;

		} else {
			return true;
		}
	}

	public List<TripMateNumDTO> getMateNum(int tripPlanNo) {
		
		List<TripMateNumDTO> list = mateListMapper.getCustDetailsByTripPlanNo(tripPlanNo);
		 return list;
	}


}
