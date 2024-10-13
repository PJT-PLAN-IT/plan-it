package com.pjt.planit.business.mate.mapper;

import com.pjt.planit.business.mate.dto.MateListDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MateListMapper {

    public List<MateListDTO> getMateList(MateListDTO param);

    public List<MateListDTO>  getTripMateNum(MateListDTO param);
}
