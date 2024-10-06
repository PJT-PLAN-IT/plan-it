package com.pjt.planit.business.placeInfo.service;

import com.pjt.planit.business.placeInfo.dto.ApiResponseDto;
import com.pjt.planit.business.placeInfo.dto.RegionTypeDto;
import com.pjt.planit.core.util.WebClientHelper;
import com.pjt.planit.business.placeInfo.dto.RegionCodeDto;
import com.pjt.planit.core.util.dto.BodyDto;
import com.pjt.planit.core.util.dto.DataDto;
import lombok.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaceInfoService {
    private final WebClientHelper webClientHelper;

    public ApiResponseDto<RegionCodeDto> region(){
        DataDto<RegionCodeDto> response = webClientHelper.fetchRegionTypeData();
        BodyDto<RegionCodeDto> body = response.getResponse().getBody();
        List<RegionCodeDto> list = body.getItems().getItem();
        List<RegionCodeDto> filterList = new ArrayList<>();

        for (RegionCodeDto regionCodeDto : list) {
            RegionCodeDto regionCode = new RegionCodeDto();
            regionCode.setRnum(regionCodeDto.getRnum());
            regionCode.setCode(regionCodeDto.getCode());
            regionCode.setName(regionCodeDto.getName());
            filterList.add(regionCode);
        }
        return ApiResponseDto.<RegionCodeDto>builder()
                .list(filterList)
                .build();
    }

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

        for (RegionTypeDto item : list) {
            RegionTypeDto regionTypeDto = new RegionTypeDto();
            regionTypeDto.setAreacode(item.getAreacode());
            regionTypeDto.setContentid(item.getContentid());
            regionTypeDto.setContenttypeid(item.getContenttypeid());
            regionTypeDto.setFirstimage2(item.getFirstimage2());
            regionTypeDto.setTitle(item.getTitle());

            filterList.add(regionTypeDto);
        }

        return ApiResponseDto.<RegionTypeDto>builder()
                .numOfRows(body.getNumOfRows())
                .pageNo(body.getPageNo())
                .totalCount(body.getTotalCount())
                .list(filterList)
                .build();
    }
}
