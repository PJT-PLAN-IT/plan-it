package com.pjt.planit.mypage.service;

import com.pjt.planit.entity.*;
import com.pjt.planit.mypage.dto.FindMateDto;
import com.pjt.planit.mypage.dto.FindMateApplyDto;
import com.pjt.planit.mypage.dto.MyMateApplyUpdateDto;
import com.pjt.planit.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MyMateListService {

    private final TripPlanRepository tripPlanRepository;
    private final CustRepository custRepository;
    private final FindMateApplyRepository findMateApplyRepository;
    private final TripMateRepository tripMateRepository;
    private final FindMateRepository findMateRepository;

    /**
     * 내가 작성한 메이트 글 조회
     * @param custNo
     * @param year
     * @return
     */
    public List<FindMateDto> myMateList(Integer custNo, Integer year) {
        List<TripPlan> list = tripPlanRepository.findAllByCustNo(custNo);  //내가 작성한 여행계획 조회;

        List<FindMateDto> result = list.stream()
                // 변환하기 전에 FindMate가 존재하는 경우만 필터링
                .filter(entity -> findMateRepository.findByTripPlanNoAndStartDtBetweenOrderByCreateDtDesc(
                        entity.getTripPlanNo(),
                        LocalDateTime.of(year, 1, 1, 0, 0, 0),
                        LocalDateTime.of(year, 12, 31, 23, 59, 59)) != null)
                .map(entity -> this.convert(entity, year))
                .collect(Collectors.toList());

        return result;
    }


    /**
     * 승인, 거절 업데이트
     * @param dto
     */
    @Transactional
    public void applyUpdate(MyMateApplyUpdateDto dto) {
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
     * @param entity
     * @param year
     * @return
     */
    private FindMateDto convert(TripPlan entity, Integer year) {
        FindMateDto dto = new FindMateDto();
        dto.setStartDt(LocalDateTime.of(year, 1, 1, 0, 0, 0));
        dto.setEndDt(LocalDateTime.of(year, 12, 31, 23, 59, 59));

        FindMate findMateList = findMateRepository.findByTripPlanNoAndStartDtBetweenOrderByCreateDtDesc(entity.getTripPlanNo(), dto.getStartDt(), dto.getEndDt());  //내가 작성한 메이트 공고

        List<FindMateApply> findMateApplyList = findMateApplyRepository.findAllByfindMateApplyNo(findMateList.getFindMateNo());  //메이트 지원 리스트 찾기

        return FindMateDto.builder()
                .findMateNo(findMateList.getFindMateNo())
                .tripPlanNo(findMateList.getTripPlanNo())
                .title(findMateList.getTitle())
                .content(findMateList.getContent())
                .startDt(findMateList.getStartDt())
                .endDt(findMateList.getEndDt())
                .recruits(findMateList.getRecruits())
                .mateApplyList(findMateApplyList.stream()
                        .map(apply -> {
                            Cust custNo = custRepository.findByCustNo(apply.getCustNo());
                            return new FindMateApplyDto().entityToDto(apply, custNo.getName());
                        }).toList())
                .build();
    }

}