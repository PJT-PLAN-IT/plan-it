package com.pjt.planit.business.placeInfo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 키워드 검색 조회
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class KeyWordDto {

    private String areacode;    //지역코드
    private String contentid;   //콘텐츠Id
    private String contenttypeid;   //관광타입(관광지, 숙박등..)
    private String firstimage2;
    private String title;   //제목
}
