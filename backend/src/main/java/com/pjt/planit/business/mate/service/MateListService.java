package com.pjt.planit.business.mate.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.pjt.planit.business.mate.dto.MateListDTO;
import com.pjt.planit.business.mate.mapper.MateListMapper;

@Service
public class MateListService {

	private final MateListMapper listMapper;

	public MateListService(MateListMapper listMapper) {
		this.listMapper = listMapper;
	}

	public List<MateListDTO> getMateList() {
		return listMapper.getList();
	}

}
