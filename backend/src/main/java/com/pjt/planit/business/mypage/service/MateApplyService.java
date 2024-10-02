package com.pjt.planit.business.mypage.service;

import com.pjt.planit.business.mypage.dto.MateListSubDto;
import com.pjt.planit.business.mypage.dto.TripMateDto;
import com.pjt.planit.db.entity.*;
import com.pjt.planit.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MateApplyService {

    private final FindMateRepository findMateRepository;
    private final FindMateApplyRepository findMateApplyRepository;
    private final CustRepository custRepository;
    private final TripPlanRepository tripPlanRepository;
    private final TripMateRepository tripMateRepository;

    /**
     * 내가 신청한 메이트글 조회
     * @param custNo
     * @param year
     * @return
     */
    public List<MateListSubDto> mateApply(Integer custNo, Integer year ) {
        List<FindMateApply> applyList = findMateApplyRepository.findBycustNo(custNo);

        MateListSubDto dto = new MateListSubDto();
        dto.setStartDt(LocalDateTime.of(year, 1, 1, 0, 0, 0));
        dto.setEndDt(LocalDateTime.of(year, 12, 31, 23, 59, 59));

        List<MateListSubDto> result = applyList.stream()
                .map(entity -> {
                    FindMate findMate = findMateRepository.findByFindMateNo(entity.getFindMateNo());
                    TripPlan tripPlan = tripPlanRepository.findByTripPlanNoAndStartDtBetweenOrderByCreateDtDesc(findMate.getTripPlanNo(), dto.getStartDt(), dto.getEndDt());
                    MateListSubDto convert = convert(findMate, tripPlan);
                    return convert;
                })
                .filter(convert -> convert != null)
                .toList();

        return result;
    }

    /**
     * 신청한 메이트글 탈퇴
     * @param dto
     */
    @Transactional
    public void applySecession(TripMateDto dto) {
        TripMate custNo = tripMateRepository.findByCustNo(dto.getCustNo());
        Integer tripMateNo = custNo.getTripMateNo();
        tripMateRepository.deleteById(tripMateNo);
    }


    /**
     * dto 변환
     * @param findMate
     * @param tripPlan
     * @return
     */
    private MateListSubDto convert(FindMate findMate, TripPlan tripPlan) {

        if (tripPlan != null) {
            Cust cust = custRepository.findByCustNo(tripPlan.getCustNo());

                return MateListSubDto.builder()
                        .findMateNo(findMate.getFindMateNo())
                        .title(findMate.getTitle())
                        .content(findMate.getContent())
                        .thumbnailImg(findMate.getThumbnailImg())
                        .startDt(tripPlan.getStartDt())
                        .endDt(tripPlan.getEndDt())
                        .name(cust.getName())
                        .build();
            }
        return null;
    }
}
