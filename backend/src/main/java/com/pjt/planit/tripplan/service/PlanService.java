package com.pjt.planit.tripplan.service;

import com.pjt.planit.entity.TripPlan;
import com.pjt.planit.repository.TripPlanRepository;
import com.pjt.planit.tripplan.dto.PlanDto;
import com.pjt.planit.tripplan.mapper.PlanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PlanService {
    @Autowired
    TripPlanRepository tripPlanRepository;
    @Autowired
    PlanMapper planMapper;

    public List<PlanDto> getPlanList(Integer custNo, Integer year) {
        PlanDto mapperParam = new PlanDto();
        mapperParam.setCustNo(custNo);
        mapperParam.setStartDt(LocalDateTime.of(year, 1, 1, 0, 0, 0));
        mapperParam.setEndDt(LocalDateTime.of(year, 12, 31, 23, 59, 59));

        return planMapper.getPlanList(mapperParam);
    }
}
