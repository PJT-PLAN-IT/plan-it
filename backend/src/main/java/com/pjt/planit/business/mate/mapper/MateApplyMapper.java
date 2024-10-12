package com.pjt.planit.business.mate.mapper;
import org.apache.ibatis.annotations.Mapper;
import com.pjt.planit.business.mate.dto.MateApplyDTO;

@Mapper
public interface MateApplyMapper {

	public void cancelApply(MateApplyDTO mateApplyDTO);

}
