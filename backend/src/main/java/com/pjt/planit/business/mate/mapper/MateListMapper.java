package com.pjt.planit.business.mate.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pjt.planit.business.mate.dto.MateListDTO;

@Mapper
public interface MateListMapper {

	List<MateListDTO> getList();

}
