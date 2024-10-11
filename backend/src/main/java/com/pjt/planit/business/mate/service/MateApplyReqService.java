package com.pjt.planit.business.mate.service;

import org.springframework.stereotype.Service;
import com.pjt.planit.business.mate.dto.MateApplyDTO;
import com.pjt.planit.db.entity.FindMateApply;
import com.pjt.planit.db.entity.TripMate;
import com.pjt.planit.db.repository.FindMateApplyRepository;
import com.pjt.planit.db.repository.TripMateRepository;
import jakarta.transaction.Transactional;

@Service
public class MateApplyReqService {

	private final FindMateApplyRepository applyRepository;
	private final TripMateRepository tripMateRepository;

	public MateApplyReqService(FindMateApplyRepository applyRepository, TripMateRepository tripMateRepository) {
		this.applyRepository = applyRepository;
		this.tripMateRepository = tripMateRepository;
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

			if ((getAllow == null && getRefuse == null) || (getAllow == "N" && getRefuse.equals("Y"))) {
				applyRepository.deleteById(applyNo);

			} else {
				deleteTripMate(mateApplyDTO);
				applyRepository.deleteById(applyNo);

			}
		}
	}

	@Transactional
	public void deleteTripMate(MateApplyDTO dto) {

		Integer tripPlanNo = dto.getTripPlanNo();
		Integer custNo = dto.getCustNo();
		TripMate tripMate = tripMateRepository.findByTripPlanNoAndCustNo(tripPlanNo, custNo);
		tripMateRepository.deleteById(tripMate.getTripMateNo());
	}
}
