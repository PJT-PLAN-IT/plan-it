package com.pjt.planit.business.main.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 최신관광 컨텐츠
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NewestPlaceDto {
    private String areacode;    //지역코드
    private String contentid;   //콘텐츠Id
    private String contenttypeid;   //관광타입(관광지, 숙박등..)
    private String firstimage2;  //썸네일 대표이미지
    private String title;   //제목
}
