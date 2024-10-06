package com.pjt.planit.business.tripplan.mapper;

import com.pjt.planit.business.tripplan.dto.TripPlanDetailDto;
import com.pjt.planit.business.tripplan.dto.TripPlanDto;
import com.pjt.planit.business.tripplan.dto.TripPlanMateDto;
import com.pjt.planit.business.tripplan.dto.TripReviewDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PlanMapper {
    public List<TripPlanDto> getPlanList(TripPlanDto param);

    public TripPlanDto getPlanDetail(TripPlanDto param);

    public List<TripPlanMateDto> getMateList(TripPlanDto param);

    public List<TripPlanDetailDto> getDetailList(TripPlanDto param);

}
