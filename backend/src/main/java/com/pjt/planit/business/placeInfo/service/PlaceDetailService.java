package com.pjt.planit.business.placeInfo.service;

import com.pjt.planit.business.placeInfo.dto.PlaceReviewDto;
import com.pjt.planit.db.entity.Cust;
import com.pjt.planit.db.entity.PlaceReview;
import com.pjt.planit.db.repository.CustRepository;
import com.pjt.planit.db.repository.PlaceReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PlaceDetailService {

    private final PlaceReviewRepository placeReviewRepository;
    private final CustRepository custRepository;

    /**
     * 여행장소 리뷰 조회
     * @param contentid
     * @param page
     * @param size
     * @return
     */
    public List<PlaceReviewDto> reviews(String contentid, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createDt").descending());
        Page<PlaceReview> pageReviews = placeReviewRepository.findAllByContentid(contentid, pageable);

        //페이징된 리뷰 수
        Integer totalCount  = (int)pageReviews.getTotalElements();
        int totalPage = pageReviews.getTotalPages();

        //전체 별점 합산 구하기
        List<PlaceReview> placeReviews = placeReviewRepository.findAllByContentid(contentid);
        double totalStar = placeReviews.stream()
                .mapToDouble(entity -> entity.getStar().doubleValue())
                .sum();

        double starAvg = totalStar / totalCount;

        // 소수점 한 자리까지 포맷팅
        String formattedStarAvg = String.format("%.1f", starAvg);

        List<PlaceReviewDto> result = placeReviews.stream()
                .map(entity -> {
                    Cust cust = custRepository.findByCustNo(entity.getCustNo());
                    PlaceReviewDto convert = convert(formattedStarAvg, entity, cust, totalCount, totalPage);
                    return convert;
                }).toList();
        return result;
    }

    /**
     * dto 변환
     * @param formattedStarAvg
     * @param placeReview
     * @param cust
     * @param totalCount
     * @param totalPage
     * @return
     */
    private PlaceReviewDto convert(String formattedStarAvg, PlaceReview placeReview, Cust cust, Integer totalCount, Integer totalPage) {

        String createDt = placeReview.getCreateDt().format(PlaceReviewDto.formatter);

        return PlaceReviewDto.builder()
                .placeReviewNo(placeReview.getPlaceReviewNo())
                .contentid(placeReview.getContentid())
                .star(placeReview.getStar())
                .starAvg(formattedStarAvg)
                .review(placeReview.getReview())
                .reviewImg1(placeReview.getReviewImg1())
                .reviewImg2(placeReview.getReviewImg2())
                .reviewImg3(placeReview.getReviewImg3())
                .reviewImg4(placeReview.getReviewImg4())
                .createDt(createDt)
                .name(cust.getName())
                .totalCount(totalCount)
                .totalPage(totalPage)
                .build();
    }
}
