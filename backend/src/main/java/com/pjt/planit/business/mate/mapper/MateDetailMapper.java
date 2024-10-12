package com.pjt.planit.business.mate.mapper;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.pjt.planit.business.mate.dto.MateDetailDTO;
import com.pjt.planit.business.tripplan.dto.TripPlanDto;
import com.pjt.planit.db.entity.FindMateReply;

@Mapper
public interface MateDetailMapper {

public MateDetailDTO getDetail(@Param("findMateNo") int findMateNo);
public List<TripPlanDto> getTripPlan (TripPlanDto param);
public void editDetail(MateDetailDTO detailDTO);
public List<FindMateReply> getMateReply(Integer findMateNo);


}
