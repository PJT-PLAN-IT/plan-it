package com.pjt.planit.business.mypage.service;

import com.pjt.planit.business.mypage.dto.ReviewListDto;
import com.pjt.planit.business.mypage.dto.ReviewRetrieveDto;
import com.pjt.planit.db.entity.PlaceReview;
import com.pjt.planit.db.repository.PlaceReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserReviewsService {

    private final PlaceReviewRepository placeReviewRepository;

    /**
     * 내가 작성한 리뷰 조회
     * @param custNo
     * @param page
     * @param size
     * @return
     */
    public List<ReviewListDto> reviewList(Integer custNo, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createDt").descending());  // createDt를 기준으로 내림차순 정렬
        Page<PlaceReview> placeReview = placeReviewRepository.findAllByCustNo(custNo, pageable);  //내가 작성한 게시물 찾기

        Integer totalCount = (int) placeReview.getTotalElements();
        Integer totalPage = placeReview.getTotalPages();

        List<ReviewListDto> result = placeReview.stream()
                .map(entitiy -> convert(entitiy, totalCount, totalPage))
                .toList();

        return result;
    }

    /**
     * 리뷰 삭제
     * @param placeReviewNo
     */
    @Transactional
    public void reviewDelete(Integer placeReviewNo) {
        placeReviewRepository.deleteByPlaceReviewNo(placeReviewNo);
    }

    /**
     * 수정버튼 누를시 등록한 리뷰정보 조회
     * @param placeReviewNo
     * @return
     */
    public ReviewRetrieveDto reviewDetail(Integer placeReviewNo) {
        PlaceReview review = placeReviewRepository.findByPlaceReviewNo(placeReviewNo);
        ReviewRetrieveDto result = ReviewRetrieveDto.builder()
                .placeReviewNo(review.getPlaceReviewNo())
                .contentid(review.getContentid())
                .star(review.getStar())
                .review(review.getReview())
                .reviewImg1(review.getReviewImg1())
                .reviewImg2(review.getReviewImg2())
                .reviewImg3(review.getReviewImg3())
                .reviewImg4(review.getReviewImg4())
                .build();
        return result;
    }

    /**
     * dto 변환
     * @param placeReview
     * @param totalCount
     * @param totalPage
     * @return
     */
    private ReviewListDto convert(PlaceReview placeReview, Integer totalCount, Integer totalPage) {

        return ReviewListDto.builder()
                .placeReviewNo(placeReview.getPlaceReviewNo())
                .contentid(placeReview.getContentid())
                .star(placeReview.getStar())
                .review(placeReview.getReview())
                .reviewImg1(placeReview.getReviewImg1())
                .createDt(placeReview.getCreateDt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                .totalCount(totalCount)
                .totalPage(totalPage)
                .build();
    }
}
