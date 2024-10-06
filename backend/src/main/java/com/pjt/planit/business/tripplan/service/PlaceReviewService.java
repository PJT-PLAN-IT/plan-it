package com.pjt.planit.business.tripplan.service;

import com.pjt.planit.business.tripplan.dto.PlaceReviewDto;
import com.pjt.planit.db.entity.PlaceReview;
import com.pjt.planit.db.entity.TripDetail;
import com.pjt.planit.db.entity.TripPlan;
import com.pjt.planit.db.repository.PlaceReviewRepository;
import com.pjt.planit.db.repository.TripDetailRepository;
import com.pjt.planit.db.repository.TripPlanRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import javax.swing.text.html.parser.Entity;
import java.util.Optional;

@Service
public class PlaceReviewService {

    private final PlaceReviewRepository placeReviewRepository;
    private final TripPlanRepository tripPlanRepository;
    private final TripDetailRepository tripDetailRepository;

    public PlaceReviewService(PlaceReviewRepository placeReviewRepository, TripPlanRepository tripPlanRepository, TripDetailRepository tripDetailRepository) {
        this.placeReviewRepository = placeReviewRepository;
        this.tripPlanRepository = tripPlanRepository;
        this.tripDetailRepository = tripDetailRepository;
    }

    public void addPlarceReview(PlaceReviewDto placeReviewDto) {

            Optional<PlaceReview> placeReviewDualCheck = placeReviewRepository.findByTripDetailNo(placeReviewDto.getTripDetailNo());
            if(placeReviewDualCheck.isPresent()) {
                
            }


            PlaceReview placeReview = PlaceReview.builder()
                    .tripDetailNo(placeReviewDto.getTripDetailNo())
                    .custNo(placeReviewDto.getCustNo())
                    .contentid(placeReviewDto.getContentid())
                    .star(placeReviewDto.getStar())
                    .review(placeReviewDto.getReview())
                    .reviewImg1(placeReviewDto.getReviewImg1())
                    .reviewImg2(placeReviewDto.getReviewImg2())
                    .reviewImg3(placeReviewDto.getReviewImg3())
                    .reviewImg4(placeReviewDto.getReviewImg4())
                    .build();

            placeReviewRepository.save(placeReview);
        }

    /**
     * 리뷰 수정
     * @param placeReviewDto
     */
    public void updatePlaceReveiw(PlaceReviewDto placeReviewDto) {
            Optional<PlaceReview> getPlaceReview =  placeReviewRepository.findByPlaceReviewNoAndCustNo(placeReviewDto.getPlaceReviewNo(), placeReviewDto.getCustNo());
            if(getPlaceReview.isPresent()) {
                PlaceReview placeReview = getPlaceReview.get();
                placeReview.setContentid(placeReviewDto.getContentid());
                placeReview.setStar(placeReviewDto.getStar());
                placeReview.setReview(placeReviewDto.getReview());
                placeReview.setReviewImg1(placeReviewDto.getReviewImg1());
                placeReview.setReviewImg2(placeReviewDto.getReviewImg2());
                placeReview.setReviewImg3(placeReviewDto.getReviewImg3());
                placeReview.setReviewImg4(placeReviewDto.getReviewImg4());
                placeReviewRepository.save(placeReview);
            }
    }


    /**
     * 리뷰등록 요청하는 사용자와 로그인한 사용자의 정보값이 같은지 확인
     * @param tripDetailNo
     * @param custNo
     * @return
     */
    public boolean isCustNoEquals(Integer tripDetailNo, Integer custNo){
        Optional<TripDetail> tripDetail =  tripDetailRepository.findByTripDetailNo(tripDetailNo);
        if (tripDetail.isEmpty()) {
            return false;
        }
        TripDetail tripDetailList = tripDetail.get();
        Integer tripPlanNo = tripDetailList.getTripPlanNo();
        Optional<TripPlan> tripPlan = tripPlanRepository.findByCustNoAndTripPlanNo(custNo, tripPlanNo);

        return tripPlan.isPresent();
    }

    /**
     * 이미 리뷰가 등록된 게시글인지 확인
     * @param placeReviewDto
     * @return
     */
    public boolean isFirstReview(PlaceReviewDto placeReviewDto){
        Optional<PlaceReview> placeReviewDualCheck = placeReviewRepository.findByTripDetailNo(placeReviewDto.getTripDetailNo());
        return placeReviewDualCheck.isEmpty();
    }


    /**
     * 리뷰 삭제
     * @param placeReviewNo
     */
    @Transactional
    public void deleteReview(Integer placeReviewNo) {
        placeReviewRepository.deleteByPlaceReviewNo(placeReviewNo);

    }
}
