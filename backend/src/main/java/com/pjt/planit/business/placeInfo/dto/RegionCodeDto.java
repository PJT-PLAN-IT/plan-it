package com.pjt.planit.business.placeInfo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 지역코드
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RegionCodeDto {
    private int rnum;
    private String code;
    private String name;
}
