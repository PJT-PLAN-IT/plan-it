package com.pjt.planit.tripplan.mapper;

import com.pjt.planit.tripplan.dto.PlanDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PlanMapper {
    public List<PlanDto> getPlanList(PlanDto param);
}
