package com.pjt.planit.business.placeInfo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RegionTypeDto {
    private String areacode;    //지역코드
    private String contentid;   //콘텐츠Id
    private String contenttypeid;   //관광타입(관광지, 숙박등..)
    private String firstimage2;  //썸네일 대표이미지
    private String title;   //제목
}
