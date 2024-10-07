package com.pjt.planit.business.tripplan.dto.openapi;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class BasicInfoDto {

    //페이지번호
    private Integer pageNo;

    //한 페이지 결과 수
    private Integer numOfRows;

    //정렬구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)
    private String arrange;

    //관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID
    private String contentTypeId;

    //지역코드
    private String areaCode;

    //키워드
    private String keyword;


}
