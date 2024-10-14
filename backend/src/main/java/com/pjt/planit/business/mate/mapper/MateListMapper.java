package com.pjt.planit.business.mate.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.pjt.planit.business.mate.dto.MateListDTO;
import com.pjt.planit.business.mate.dto.MateTripPlanDTO;
import com.pjt.planit.business.mate.dto.TripMateNumDTO;
import com.pjt.planit.business.tripplan.dto.TripPlanDto;
import com.pjt.planit.business.mate.dto.MateListDTO;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface MateListMapper {

	List<MateListDTO> getList();

	List<TripMateNumDTO> getCustDetailsByTripPlanNo(@Param("tripPlanNo") int tripPlanNo);

	public List<MateListDTO> getMateList(MateListDTO param);

	public List<MateListDTO> getTripMateNum(MateListDTO param);

}
