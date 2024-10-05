package com.pjt.planit.business.tripplan.service;

import com.pjt.planit.db.entity.TripPlan;
import com.pjt.planit.db.repository.TripPlanRepository;
import com.pjt.planit.business.tripplan.dto.TripPlanDto;
import com.pjt.planit.business.tripplan.mapper.PlanMapper;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;


@Service
public class PlanService {
    private final TripPlanRepository tripPlanRepository;
    private final PlanMapper planMapper;

    public PlanService(TripPlanRepository tripPlanRepository, PlanMapper planMapper) {
        this.tripPlanRepository = tripPlanRepository;
        this.planMapper = planMapper;
    }

    public TripPlanDto getPlanDetail(int tripPlanNo) {
        TripPlanDto tripPlanDto = new TripPlanDto();
        tripPlanDto.setTripPlanNo(tripPlanNo);
        tripPlanDto = planMapper.getPlanDetail(tripPlanDto);
        tripPlanDto.setTripPlanMateList(planMapper.getMateList(tripPlanDto));
        tripPlanDto.setTripPlanDetailList(planMapper.getDetailList(tripPlanDto));
        return tripPlanDto;
    }

    public List<TripPlanDto> getPlanList(Integer custNo, Integer year) {
        TripPlanDto mapperParam = new TripPlanDto();
        mapperParam.setCustNo(custNo);
        mapperParam.setStartDt(LocalDateTime.of(year, 1, 1, 0, 0, 0));
        mapperParam.setEndDt(LocalDateTime.of(year, 12, 31, 23, 59, 59));

        return planMapper.getPlanList(mapperParam);
    }


}
