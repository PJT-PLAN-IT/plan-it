package com.pjt.planit.business.placeInfo.service;

import com.pjt.planit.business.placeInfo.dto.*;
import com.pjt.planit.core.util.openapi.WebClientHelper;
import com.pjt.planit.core.util.openapi.dto.BodyDto;
import com.pjt.planit.core.util.openapi.dto.DataDto;
import lombok.*;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaceInfoService {
    private final WebClientHelper webClientHelper;

    /**
     * 지역코드
     * @return
     */
    public ApiResponseDto<RegionCodeDto> region(){
        DataDto<RegionCodeDto> response = webClientHelper.fetchRegionData();
        BodyDto<RegionCodeDto> body = response.getResponse().getBody();
        List<RegionCodeDto> list = body.getItems().getItem();
        List<RegionCodeDto> filterList = new ArrayList<>();

        for (RegionCodeDto dto : list) {
            RegionCodeDto regionCodeDto = new RegionCodeDto();
            regionCodeDto.setRnum(dto.getRnum());
            regionCodeDto.setCode(dto.getCode());
            regionCodeDto.setName(dto.getName());
            filterList.add(regionCodeDto);
        }
        return ApiResponseDto.<RegionCodeDto>builder()
                .list(filterList)
                .build();
    }

    /**
     * 지역코드 + 카테고리
     * @param numOfRows
     * @param pageNo
     * @param arrange
     * @param contentTypeId
     * @param areaCode
     * @return
     */
    public ApiResponseDto<RegionTypeDto> regionType(Integer numOfRows, Integer pageNo, String arrange, String contentTypeId, String areaCode) {

        String params = "numOfRows=" + numOfRows +
                "&pageNo=" + pageNo +
                "&arrange=" + arrange +
                "&contentTypeId=" + contentTypeId +
                "&areaCode=" + areaCode;

        DataDto<RegionTypeDto> response = webClientHelper.fetchRegionTypeData(params);
        BodyDto<RegionTypeDto> body = response.getResponse().getBody();
        List<RegionTypeDto> list = body.getItems().getItem();
        List<RegionTypeDto> filterList  = new ArrayList<>();

        for (RegionTypeDto dto : list) {
            RegionTypeDto regionTypeDto = new RegionTypeDto();
            regionTypeDto.setAreacode(dto.getAreacode());
            regionTypeDto.setContentid(dto.getContentid());
            regionTypeDto.setContenttypeid(dto.getContenttypeid());
            regionTypeDto.setFirstimage2(dto.getFirstimage2());
            regionTypeDto.setTitle(dto.getTitle());

            filterList.add(regionTypeDto);
        }

        return ApiResponseDto.<RegionTypeDto>builder()
                .numOfRows(body.getNumOfRows())
                .pageNo(body.getPageNo())
                .totalCount(body.getTotalCount())
                .list(filterList)
                .build();
    }

    /**
     * 키워드 검색
     * @param keyWord
     * @return
     */
    public ApiResponseDto<KeyWordDto> keyWord(Integer numOfRows, Integer pageNo, String keyWord) throws UnsupportedEncodingException {

        String result = encodeVal(keyWord);

        String params = "numOfRows=" + numOfRows + "&pageNo=" + pageNo + "&keyword=" + result;

        DataDto<KeyWordDto> response = webClientHelper.fetchKeyWordData(params);
        BodyDto<KeyWordDto> body = response.getResponse().getBody();
        List<KeyWordDto> list = body.getItems().getItem();
        List<KeyWordDto> keyWordDtoList = new ArrayList<>();

        for (KeyWordDto dto : list) {
            KeyWordDto keyWordDto = new KeyWordDto();
            keyWordDto.setAreacode(dto.getAreacode());
            keyWordDto.setContentid(dto.getContentid());
            keyWordDto.setContenttypeid(dto.getContenttypeid());
            keyWordDto.setFirstimage2(dto.getFirstimage2());
            keyWordDto.setTitle(dto.getTitle());

            keyWordDtoList.add(keyWordDto);
        }

        return ApiResponseDto.<KeyWordDto>builder()
                .numOfRows(body.getNumOfRows())
                .pageNo(body.getPageNo())
                .totalCount(body.getTotalCount())
                .list(keyWordDtoList)
                .build();
    }

    private String encodeVal(String text) throws UnsupportedEncodingException {
        String val = text;
        String encodedVal = "";
        encodedVal = URLEncoder.encode(val, "utf-8");
        return encodedVal;
    }

}
