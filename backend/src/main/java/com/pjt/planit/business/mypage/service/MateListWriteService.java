package com.pjt.planit.business.mypage.service;

import com.pjt.planit.db.entity.*;
import com.pjt.planit.db.repository.*;
import com.pjt.planit.business.mypage.dto.MateListWriteDto;
import com.pjt.planit.business.mypage.dto.MateApplyDto;
import com.pjt.planit.business.mypage.dto.MateApplyUpdateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MateListWriteService {

    private final TripPlanRepository tripPlanRepository;
    private final CustRepository custRepository;
    private final FindMateApplyRepository findMateApplyRepository;
    private final TripMateRepository tripMateRepository;
    private final FindMateRepository findMateRepository;

    /**
     * 내가 작성한 메이트글 조회
     * @param custNo
     * @param year
     * @return
     */
    public List<MateListWriteDto> myMateList(Integer custNo, Integer year) {
        MateListWriteDto dto = new MateListWriteDto();
        dto.setStartDt(LocalDateTime.of(year, 1, 1, 0, 0, 0));
        dto.setEndDt(LocalDateTime.of(year, 12, 31, 23, 59, 59));

        List<TripPlan> list = tripPlanRepository.findAllByCustNoAndStartDtBetweenOrderByCreateDtDesc(custNo, dto.getStartDt(),dto.getEndDt());  //내가 작성한 여행계획 조회;

        List<MateListWriteDto> result = list.stream()
                .map(entity -> {
                    FindMate findMate = findMateRepository.findByTripPlanNo(entity.getTripPlanNo());  //메이트 공고 찾기
                    MateListWriteDto convert = convert(findMate, entity);
                    return convert;
                })
                .filter(convert -> convert != null)
                .toList();

        return result;
    }


    /**
     * 승인, 거절 업데이트
     * @param dto
     */
    @Transactional
    public void applyUpdate(MateApplyUpdateDto dto) {
        FindMateApply entity = findMateApplyRepository.findById(dto.getFindMateApplyNo()).get();
        entity.updateYn(dto.getAllowYn(), dto.getRefuseYn());

        findMateApplyRepository.save(entity);
        if (StringUtils.hasText(dto.getAllowYn())) {
            TripMate tripMate = TripMate.builder()
                    .tripPlanNo(dto.getTripPlanNo())
                    .custNo(dto.getCustNo())
                    .build();

            tripMateRepository.save(tripMate);
        }
    }


    /**
     * dto 변환
     * @param findMate
     * @param tripPlan
     * @return
     */
    private MateListWriteDto convert(FindMate findMate, TripPlan tripPlan) {
        if (findMate != null) {
        List<FindMateApply> findMateApplyList = findMateApplyRepository.findAllByfindMateNo(findMate.getFindMateNo());  //메이트 지원 리스트 찾기

            return MateListWriteDto.builder()
                    .findMateNo(findMate.getFindMateNo())
                    .title(findMate.getTitle())
                    .content(findMate.getContent())
                    .thumbnailImg(findMate.getThumbnailImg())
                    .recruits(findMate.getRecruits())
                    .startDt(tripPlan.getStartDt())
                    .endDt(tripPlan.getEndDt())
                    .mateApplyList(findMateApplyList.stream()
                            .map(apply -> {
                                Cust custNo = custRepository.findByCustNo(apply.getCustNo());
                                return new MateApplyDto().entityToDto(apply, custNo.getName());
                            }).toList())
                    .build();
        }
        return null;
    }

}