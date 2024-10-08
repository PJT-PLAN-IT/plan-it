package com.pjt.planit.business.tripplan.dto.openapi;

import com.pjt.planit.business.mypage.dto.ReviewListDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlaceInfoListDto {
    private String title;   //제목
    private String addr1; //주소
    private String addr2; // 상세주소
    private String mapx; // 경도
    private String mapy; // 위도
    private String mlevel; //지도 level
    private String areacode;    //지역코드
    private String contentid;   //콘텐츠Id
    private String contenttypeid;   //관광타입(관광지, 숙박등..)
    private Double starAvg;
    private Integer reviewCount;
    List<PlaceInfoReviewDto> reviewList;

}
