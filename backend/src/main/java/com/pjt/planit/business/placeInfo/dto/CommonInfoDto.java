package com.pjt.planit.business.placeInfo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 공통정보
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommonInfoDto {

    private String areacode;    //지역코드
    private String contentid;   //콘텐츠Id
    private String contenttypeid;   //관광타입(관광지, 숙박등..)
    private String title;   //제목
    private String zipcode;     //우편번호
    private String addr1;   //주소
    private String overview;    //소개
}
