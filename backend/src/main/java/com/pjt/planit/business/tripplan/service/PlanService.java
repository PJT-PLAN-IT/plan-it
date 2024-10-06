package com.pjt.planit.business.tripplan.service;

import com.pjt.planit.business.tripplan.dto.TripPlanDetailDto;
import com.pjt.planit.business.tripplan.dto.TripPublicYnDto;
import com.pjt.planit.business.tripplan.dto.TripReviewDto;
import com.pjt.planit.db.entity.Cust;
import com.pjt.planit.db.entity.TripDetail;
import com.pjt.planit.db.entity.TripPlan;
import com.pjt.planit.db.repository.CustRepository;
import com.pjt.planit.db.repository.TripDetailRepository;
import com.pjt.planit.db.repository.TripPlanRepository;
import com.pjt.planit.business.tripplan.dto.TripPlanDto;
import com.pjt.planit.business.tripplan.mapper.PlanMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class PlanService {
    private final TripPlanRepository tripPlanRepository;
    private final TripDetailRepository tripDetailRepository;
    private final PlanMapper planMapper;

    public PlanService(TripPlanRepository tripPlanRepository, TripDetailRepository tripDetailRepository, PlanMapper planMapper) {
        this.tripPlanRepository = tripPlanRepository;
        this.tripDetailRepository = tripDetailRepository;
        this.planMapper = planMapper;
    }

    /**
     * 여행 게획 상세 내용 리턴
     * @return TripPlanDto
     */
    public TripPlanDto getPlanDetail(int tripPlanNo) {
        TripPlanDto tripPlanDto = new TripPlanDto();
        tripPlanDto.setTripPlanNo(tripPlanNo);
        tripPlanDto = planMapper.getPlanDetail(tripPlanDto);
        tripPlanDto.setTripPlanMateList(planMapper.getMateList(tripPlanDto));
        tripPlanDto.setTripPlanDetailList(planMapper.getDetailList(tripPlanDto));
        return tripPlanDto;
    }

    /**
     * 사용자가 만든 여행 리스트 리턴
     * @return TripPlanDto
     */
    public List<TripPlanDto> getPlanList(Integer custNo, Integer year) {
        TripPlanDto mapperParam = new TripPlanDto();
        mapperParam.setCustNo(custNo);
        mapperParam.setStartDt(LocalDateTime.of(year, 1, 1, 0, 0, 0));
        mapperParam.setEndDt(LocalDateTime.of(year, 12, 31, 23, 59, 59));

        return planMapper.getPlanList(mapperParam);
    }

    /**
     * 사용자의 여행 계획 추가
     *
     */
    public void addTripPlan(TripPlanDto tripPlanDto) {

        addTripPlanEntity(tripPlanDto);
        TripPlan getRecentTripPlan = findRecentTripPlan(tripPlanDto.getCustNo());

        for(TripPlanDetailDto detailList : tripPlanDto.getTripPlanDetailList()){
            addPlanDetail(detailList, getRecentTripPlan.getTripPlanNo());
        }
    }


    /**
     * 여행 계획 수정
     * @param tripPlanDto
     */
    public void updateTripPlan(TripPlanDto tripPlanDto) {
        Optional<TripPlan> getPlan = tripPlanRepository.findByCustNoAndTripPlanNo(tripPlanDto.getCustNo(), tripPlanDto.getTripPlanNo());

        if (getPlan.isPresent()) {
            TripPlan tripPlan = getPlan.get();
            tripPlan.setTitle(tripPlanDto.getTitle() == null ? tripPlan.getTitle() : tripPlanDto.getTitle());
            tripPlan.setStartDt(tripPlanDto.getStartDt() == null ? tripPlan.getStartDt(): tripPlanDto.getStartDt());
            tripPlan.setEndDt(tripPlanDto.getEndDt() == null ? tripPlan.getEndDt(): tripPlanDto.getEndDt());
            tripPlanRepository.save(tripPlan);
        }

        // 삭제된 Detail Delete
        List<TripDetail> tripDetailList = tripDetailRepository.findAllByTripPlanNo(tripPlanDto.getTripPlanNo()).orElseGet(ArrayList::new); //백
        if (!tripDetailList.isEmpty()) {
            List<Integer> tripPlanDetailNoList = tripPlanDto.getTripPlanDetailList().stream().map(TripPlanDetailDto::getTripDetailNo).toList(); //프론트
            List<TripDetail> removeList = tripDetailList.stream().filter(detail -> !tripPlanDetailNoList.contains(detail.getTripDetailNo())).toList();
            tripDetailRepository.deleteAll(removeList);
        }

        // 추가되거나 수정된 Detail Save
        tripDetailList = new ArrayList<>();
        for (TripPlanDetailDto detailDto : tripPlanDto.getTripPlanDetailList()) {
            TripDetail tripDetail = convertTripPlanDetailDtoToTripDetail(detailDto);
            tripDetail.setTripPlanNo(tripPlanDto.getTripPlanNo());
            tripDetailList.add(tripDetail);
        }
        tripDetailRepository.saveAll(tripDetailList);
    }

    /**
     * TripDetail 수정 및 신규 객체 생성 메소드
     * @param detailDto p1
     * @return TripDetail
     */
    public TripDetail convertTripPlanDetailDtoToTripDetail(TripPlanDetailDto detailDto) {
        TripDetail tripDetail;

        if (detailDto.getTripDetailNo() == null) {
            tripDetail = new TripDetail();
        } else {
            Optional<TripDetail> tripDetailOptional = tripDetailRepository.findById(detailDto.getTripDetailNo());
            tripDetail = tripDetailOptional.orElseGet(TripDetail::new);
        }

        tripDetail.setPlanDt( detailDto.getPlanDt() == null ?  tripDetail.getPlanDt() : detailDto.getPlanDt());
        tripDetail.setSeq( detailDto.getSeq() == null ? tripDetail.getSeq() : detailDto.getSeq());
        tripDetail.setContentid( detailDto.getContentid() == null ? tripDetail.getContentid() : detailDto.getContentid());
        tripDetail.setContentTypeId(detailDto.getContentTypeId() == null ? tripDetail.getContentTypeId() : detailDto.getContentTypeId());
        tripDetail.setTitle( detailDto.getPlaceTitle() == null ?  tripDetail.getTitle() : detailDto.getPlaceTitle());
        tripDetail.setAddress( detailDto.getAddress() == null ?  tripDetail.getAddress() : detailDto.getAddress());
        tripDetail.setMapx( detailDto.getMapx() == null ?  tripDetail.getMapx() : detailDto.getMapx());
        tripDetail.setMapy( detailDto.getMapy() == null ?  tripDetail.getMapy() : detailDto.getMapy());

        return tripDetail;
    }

    /**
     * 여행 계획 삭제
     * @param tripPlanNo
     */
    @Transactional
    public void deleteTripPlan(Integer tripPlanNo) {
        tripPlanRepository.deleteByTripPlanNo(tripPlanNo);
        tripDetailRepository.deleteAllByTripPlanNo(tripPlanNo);
    }




    /**
     * 여행 계획 기본 정보 추가
     * @param tripPlanDto
     */
    public void addTripPlanEntity(TripPlanDto tripPlanDto) {
        TripPlan tripPlan = TripPlan.builder()
                .custNo(tripPlanDto.getCustNo())
                .tripPlanNo(tripPlanDto.getTripPlanNo())
                .title(tripPlanDto.getTitle())
                .startDt(tripPlanDto.getStartDt())
                .endDt(tripPlanDto.getEndDt())
                .thumbnailImg(tripPlanDto.getThumbnailImg())
                .review(tripPlanDto.getReview())
                .publicYn(tripPlanDto.getPublicYn())
                .build();

        tripPlanRepository.save(tripPlan);
    }

    /**
     * 사용자의 여행 계획 디테일 내용 추가
     * @param detailList
     * @param tripPlanNo
     */
    public void addPlanDetail(TripPlanDetailDto detailList, int tripPlanNo) {
        TripDetail tripDetail = TripDetail.builder()
                .tripPlanNo(tripPlanNo)
                .planDt(detailList.getPlanDt())
                .seq(detailList.getSeq())
                .contentid(detailList.getContentid())
                .contentTypeId(detailList.getContentTypeId())
                .title(detailList.getPlaceTitle())
                .address(detailList.getAddress())
                .mapx(detailList.getMapx())
                .mapy(detailList.getMapy())
                .build();
        tripDetailRepository.save(tripDetail);
    }

    /**
     * 사용자가 가장 최근에 저장한 여행 내역 리턴
     * @param custNo
     */
    public TripPlan findRecentTripPlan(Integer custNo) {
        TripPlan tripPlan;
        tripPlan =  tripPlanRepository.findFirstByCustNoOrderByTripPlanNoDesc(custNo);
        return tripPlan;
    }


    /**
     * 여행 리뷰 추가
     * @param tripReviewDto
     */
    public void addReview(TripReviewDto tripReviewDto) {
        Optional<TripPlan> getTripPlan =  tripPlanRepository.findById(tripReviewDto.getTripPlanNo());

        if(getTripPlan.isPresent()) {
            TripPlan tripPlan = getTripPlan.get();
            tripPlan.setReview(tripReviewDto.getReview());
            tripPlanRepository.save(tripPlan);
        }
    }

    /**
     * 공개설정 수정
     * @param tripPublicYnDto
     */
    public void changePublic(TripPublicYnDto tripPublicYnDto) {
        Optional<TripPlan> getTripPlan =  tripPlanRepository.findById(tripPublicYnDto.getTripPlanNo());

        if(getTripPlan.isPresent()) {
            TripPlan tripPlan = getTripPlan.get();
            tripPlan.setPublicYn(tripPublicYnDto.getPublicYn());
            tripPlanRepository.save(tripPlan);
        }
    }
}
