package com.pjt.planit.business.mypage.service;

import com.pjt.planit.business.mypage.dto.MateListSubDto;
import com.pjt.planit.business.mypage.dto.TripMateCancelDto;
import com.pjt.planit.business.mypage.dto.TripMateSecessionDto;
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
        List<FindMateApply> applyList = findMateApplyRepository.findBycustNo(custNo);   //내가 신청한 메이트 현황 찾기

        MateListSubDto dto = new MateListSubDto();
        dto.setStartDt(LocalDateTime.of(year, 1, 1, 0, 0, 0));
        dto.setEndDt(LocalDateTime.of(year, 12, 31, 23, 59, 59));

        List<MateListSubDto> result = applyList.stream()
                .map(entity -> {
                    String allowYn = entity.getAllowYn();
                    FindMate findMate = findMateRepository.findByFindMateNo(entity.getFindMateNo());    //메이트 공고 찾기
                    TripPlan tripPlan = tripPlanRepository.findByTripPlanNoAndStartDtBetweenOrderByStartDtDesc(findMate.getTripPlanNo(), dto.getStartDt(), dto.getEndDt());
                    TripMate tripMate = tripMateRepository.findByTripPlanNoAndCustNo(tripPlan.getTripPlanNo(), custNo);
                    MateListSubDto convert = convert(allowYn, findMate, tripPlan, tripMate);
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
    public void applySecession(TripMateSecessionDto dto) {
        tripMateRepository.deleteById(dto.getTripMateNo());
    }

    /**
     * 신청한 메이트글 취소
     * @param dto
     */
    @Transactional
    public void applyCancel(TripMateCancelDto dto) {
        FindMateApply findMateApply = findMateApplyRepository.findByFindMateNoAndCustNo(dto.getFindMateNo(), dto.getCustNo());
        findMateApplyRepository.deleteById(findMateApply.getFindMateApplyNo());
    }

    /**
     * dto 변환
     * @param allowYn
     * @param findMate
     * @param tripPlan
     * @param tripMate
     * @return
     */
    private MateListSubDto convert(String allowYn, FindMate findMate, TripPlan tripPlan, TripMate tripMate) {

        if (tripPlan != null) {
            Cust cust = custRepository.findByCustNo(tripPlan.getCustNo());

            MateListSubDto.MateListSubDtoBuilder list = MateListSubDto.builder()
                    .findMateNo(findMate.getFindMateNo())
                    .title(findMate.getTitle())
                    .content(findMate.getContent())
                    .thumbnailImg(findMate.getThumbnailImg())
                    .allowYn(allowYn)
                    .tripPlanNo(tripPlan.getTripPlanNo())
                    .startDt(tripPlan.getStartDt())
                    .endDt(tripPlan.getEndDt())
                    .name(cust.getName());
            if (tripMate != null) {
                list.tripMateNo(tripMate.getTripMateNo());
            }
            return list.build();
        }
        return null;
    }
}
