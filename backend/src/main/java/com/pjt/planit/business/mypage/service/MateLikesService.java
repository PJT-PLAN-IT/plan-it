package com.pjt.planit.business.mypage.service;

import com.pjt.planit.db.entity.Cust;
import com.pjt.planit.db.entity.FindMate;
import com.pjt.planit.db.entity.FindMateLike;
import com.pjt.planit.db.entity.TripPlan;
import com.pjt.planit.db.repository.CustRepository;
import com.pjt.planit.db.repository.FindMateLikeRepository;
import com.pjt.planit.db.repository.FindMateRepository;
import com.pjt.planit.db.repository.TripPlanRepository;
import com.pjt.planit.business.mypage.dto.MateListLikeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MateLikesService {

    private final FindMateLikeRepository findMateLikeRepository;
    private final TripPlanRepository tripPlanRepository;
    private final FindMateRepository findMateRepository;
    private final CustRepository custRepository;

    /**
     * 좋아요한 메이트글 조회
     * @param custNo
     * @param year
     * @return
     */
    public List<MateListLikeDto> mateListLikes(Integer custNo, Integer year) {
        List<FindMateLike> likeList = findMateLikeRepository.findAllByCustNo(custNo);  //좋아요 누른 리스트 찾기

        MateListLikeDto dto = new MateListLikeDto();
        dto.setStartDt(LocalDateTime.of(year, 1, 1, 0, 0, 0));
        dto.setEndDt(LocalDateTime.of(year, 12, 31, 23, 59, 59));

        List<MateListLikeDto> result = likeList.stream()
                .map(entity -> {
                    FindMate findMate = findMateRepository.findByFindMateNo(entity.getFindMateNo());
                    TripPlan tripPlan = tripPlanRepository.findByTripPlanNoAndStartDtBetweenOrderByCreateDtDesc(findMate.getTripPlanNo(), dto.getStartDt(), dto.getEndDt());
                    MateListLikeDto convert = convert(findMate, tripPlan);
                    return convert;
                })
                .filter(convert -> convert != null)
                .toList();

        return result;
    }


    /**
     * dto 변환
     * @param findMate
     * @param tripPlan
     * @return
     */
    private MateListLikeDto convert(FindMate findMate, TripPlan tripPlan) {
        if (tripPlan != null) {
            Cust cust = custRepository.findByCustNo(tripPlan.getCustNo());

                return MateListLikeDto.builder()
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
