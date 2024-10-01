package com.pjt.planit.mypage.service;

import com.pjt.planit.entity.*;
import com.pjt.planit.mypage.dto.FindMateDto;
import com.pjt.planit.mypage.dto.FindMateApplyDto;
import com.pjt.planit.mypage.dto.TripMateDto;
import com.pjt.planit.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MyMateApplyService {

    private final FindMateRepository findMateRepository;
    private final FindMateApplyRepository findMateApplyRepository;
    private final CustRepository custRepository;
    private final TripPlanRepository tripPlanRepository;
    private final TripMateRepository tripMateRepository;

    /**
     * 내가 신청한 메이트 공고 조회
     * @param custNo
     * @param year
     * @return
     */
    public List<FindMateDto> mateApply(Integer custNo, Integer year ) {

        FindMateApplyDto dto = new FindMateApplyDto();
        dto.setApplyDt(LocalDateTime.of(year, 1, 1, 0, 0, 0));
        dto.setExpiredDt(LocalDateTime.of(year, 12, 31, 23, 59, 59));
        List<FindMateApply> list = findMateApplyRepository.findAllByCustNoAndApplyDtBetweenOrderByCreateDtDesc(custNo, dto.getApplyDt(), dto.getExpiredDt());

        List<Integer> findMateNo = list.stream()
                .map(entity -> entity.getFindMateNo())
                .collect(Collectors.toList());

        List<FindMate> findMate = findMateRepository.findAllById(findMateNo);

        List<FindMateDto> result = findMate.stream()
                .map(entity -> this.convert(entity))
                .collect(Collectors.toList());

        return result;
    }

    /**
     * 신청한 메이트글 탈퇴
     * @param dto
     */
    @Transactional
    public void applySecession(TripMateDto dto) {
        Optional<TripMate> tripMate = tripMateRepository.findById(dto.getCustNo());
        if (tripMate.isPresent()) {
            Integer tripMateNo = tripMate.get().getTripMateNo();
            tripMateRepository.deleteById(tripMateNo);
        }
    }



    /**
     * dto 변환
     * @param entity
     * @return
     */
    private FindMateDto convert(FindMate entity) {

        TripPlan tripPlan = tripPlanRepository.findByTripPlanNo(entity.getTripPlanNo());
        Cust cust = custRepository.findById(tripPlan.getCustNo()).get();

        return FindMateDto.builder()
                .findMateNo(entity.getFindMateNo())
                .tripPlanNo(entity.getTripPlanNo())
                .title(entity.getTitle())
                .content(entity.getContent())
                .startDt(entity.getStartDt())
                .endDt(entity.getEndDt())
                .custName(cust.getName())
                .build();
    }
}
