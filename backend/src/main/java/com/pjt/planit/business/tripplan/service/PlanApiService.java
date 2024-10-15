package com.pjt.planit.business.tripplan.service;

import com.pjt.planit.business.placeInfo.dto.ApiResponseDto;
import com.pjt.planit.business.tripplan.dto.openapi.BasicInfoDto;
import com.pjt.planit.business.tripplan.dto.openapi.PlaceInfoListDto;
import com.pjt.planit.business.tripplan.dto.openapi.PlaceInfoReviewDto;
import com.pjt.planit.business.tripplan.mapper.PlanMapper;
import com.pjt.planit.core.util.openapi.WebClientHelper;
import com.pjt.planit.core.util.openapi.dto.BodyDto;
import com.pjt.planit.core.util.openapi.dto.DataDto;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Service
public class PlanApiService {

    private final WebClientHelper webClientHelper;
    private final PlanMapper planMapper;

    public PlanApiService(WebClientHelper webClientHelper, PlanMapper planMapper) {
        this.webClientHelper = webClientHelper;
        this.planMapper = planMapper;
    }


    public ApiResponseDto<PlaceInfoListDto> getPlaceByAreaCodeAndContentTypeId(BasicInfoDto basicInfoDto) throws UnsupportedEncodingException {
        /**
         *  String params : open-api에 보낼 params값 설정
         *  https://apis.data.go.kr/B551011/KorService1/areaBasedList1?MobileOS=AND&MobileApp=Planit&_type=json&serviceKey=EtYjTDxd2toVo6%2FPdXG7vTkcC56PrgsfxSDr2bC4SvITA2pWeqcIgcmcgMCA41x%2F8ahVNdfcQnV%2BtlIPDQfoHw%3D%3D
         *  &arrange=A&contentTypeId=39&areaCode=1
         */
        String params = "numOfRows=" + basicInfoDto.getNumOfRows()
                    + "&pageNo=" + basicInfoDto.getPageNo()
                    + "&arrange="+ basicInfoDto.getArrange();
        /**
         * 각 if절에 데이터가 없으면 params에 검색을 넣을 필요가 없으므로
         * null이 아니면 params에 검색 조건을 붙임
         */
        if (basicInfoDto.getContentTypeId() != null){
            params += "&contentTypeId=" + basicInfoDto.getContentTypeId();
        }
        if(basicInfoDto.getAreaCode() != null){
            params += "&areaCode=" + basicInfoDto.getAreaCode();
        }
        if(basicInfoDto.getKeyword() != null){
            String keyword = encodeVal(basicInfoDto.getKeyword());
            params += "&keyword=" + keyword;
        }

        /**
         * 결과값을 받을 dto 초기화
         */
        DataDto<PlaceInfoListDto> response = new DataDto<>();

        /**
         * open-api는 키워드 있을때와 없을때가 검색 url이 달라서 keyword 여부에 따라 url 찾아오는 조건을 정해줌
         */
        if(basicInfoDto.getKeyword() != null){
            response = webClientHelper.findPlaceByKeyword(params);
        }else{
            response = webClientHelper.findPlaceByAreaAndContent(params);
        }

        //결과를 dto에 담는 부분
        BodyDto<PlaceInfoListDto> body = response.getResponse().getBody();
        List<PlaceInfoListDto> list = body.getItems().getItem();
        List<PlaceInfoListDto> result = new ArrayList<>();

        for(PlaceInfoListDto dto : list){
            PlaceInfoListDto placeInfoListDto = new PlaceInfoListDto();
            placeInfoListDto.setAreacode(dto.getAreacode());
            placeInfoListDto.setContentid(dto.getContentid());
            placeInfoListDto.setContenttypeid(dto.getContenttypeid());
            placeInfoListDto.setTitle(dto.getTitle());
            placeInfoListDto.setAddr1(dto.getAddr1());
            placeInfoListDto.setAddr2(dto.getAddr2());
            placeInfoListDto.setMapx(dto.getMapx());
            placeInfoListDto.setMapy(dto.getMapy());
            placeInfoListDto.setMlevel(dto.getMlevel());
            result.add(placeInfoListDto);
        }

        /**
         * ApiResponseDto를 확인해 보면
         *
         *    private List<T> list;
         *     private int numOfRows;
         *     private int pageNo;
         *     private int totalCount;
         *     위와 같이 선언되어 있는 것을 확인할 수 있음.
         *    open-api에서 보내준 결과값을 각각 데이터에 담아 클라이언트 단으로 리턴
         */

        return ApiResponseDto.<PlaceInfoListDto>builder()
                .numOfRows(body.getNumOfRows())
                .pageNo(body.getPageNo())
                .totalCount(body.getTotalCount())
                .list(result)
                .build();

    }

    public PlaceInfoListDto getPlaceByAreaCodeAndContentTypeIdAndReview(BasicInfoDto basicInfoDto) throws UnsupportedEncodingException {
        String params = "numOfRows=" + basicInfoDto.getNumOfRows()
                + "&pageNo=" + basicInfoDto.getPageNo()
                + "&arrange="+ basicInfoDto.getArrange()
                + "&contentTypeId=" + basicInfoDto.getContentTypeId()
                + "&areaCode=" + basicInfoDto.getAreaCode();

            String keyword = encodeVal(basicInfoDto.getKeyword());
            params += "&keyword=" + keyword;

        DataDto<PlaceInfoListDto> response =  response = webClientHelper.findPlaceByKeyword(params);

        BodyDto<PlaceInfoListDto> body = response.getResponse().getBody();
        List<PlaceInfoListDto> list = body.getItems().getItem();

        PlaceInfoListDto placeInfoListDto = list.get(0);
        List<PlaceInfoReviewDto> reviewList = planMapper.getReviewList(placeInfoListDto);
        placeInfoListDto.setReviewList(reviewList);
        placeInfoListDto.setStarAvg(Math.round(reviewList.stream().mapToInt(PlaceInfoReviewDto::getStar).average().orElse(0.0) * 10) / 10.0);
        placeInfoListDto.setReviewCount(reviewList.size());

        return placeInfoListDto;
    }

    private String encodeVal(String text) throws UnsupportedEncodingException {
        String val = text;
        String encodedVal = "";
        encodedVal = URLEncoder.encode(val, "utf-8");
        return encodedVal;
    }
}
