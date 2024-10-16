package com.pjt.planit.business.tripplan.mapper;

import com.pjt.planit.business.mate.dto.MateDetailDTO;
import com.pjt.planit.business.tripplan.dto.TripPlanDetailDto;
import com.pjt.planit.business.tripplan.dto.TripPlanDto;
import com.pjt.planit.business.tripplan.dto.TripPlanMateDto;
import com.pjt.planit.business.tripplan.dto.openapi.PlaceInfoListDto;
import com.pjt.planit.business.tripplan.dto.openapi.PlaceInfoReviewDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PlanMapper {
    public List<TripPlanDto> getPlanList(TripPlanDto param);

    public TripPlanDto getPlanDetail(TripPlanDto param);

    public List<TripPlanMateDto> getMateList(TripPlanDto param);

    public List<TripPlanDetailDto> getDetailList(TripPlanDto param);

    public List<TripPlanDetailDto> getDetailList2(TripPlanDto param);

    public List<PlaceInfoReviewDto> getReviewList(PlaceInfoListDto param);


}
