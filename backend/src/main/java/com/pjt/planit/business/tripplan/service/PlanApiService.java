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

        String params = "numOfRows=" + basicInfoDto.getNumOfRows()
                    + "&pageNo=" + basicInfoDto.getPageNo()
                    + "&arrange="+ basicInfoDto.getArrange();
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

        DataDto<PlaceInfoListDto> response = null;

        if(basicInfoDto.getKeyword() != null){
            response = webClientHelper.findPlaceByKeyword(params);
        }else{
            response = webClientHelper.findPlaceByAreaAndContent(params);
        }

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
