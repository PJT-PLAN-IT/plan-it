package com.pjt.planit.core.util.openapi;

import com.pjt.planit.business.placeInfo.dto.RegionCodeDto;
import com.pjt.planit.business.placeInfo.dto.RegionTypeDto;
import com.pjt.planit.core.util.openapi.dto.DataDto;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WebClientHelper {
    private final WebClientUtil webClientUtil;

    public <T> T fechData(String path, String param, ParameterizedTypeReference<T> typeReference) {
        return webClientUtil.get(path, param, typeReference);
    }

    public DataDto<RegionCodeDto> fetchRegionTypeData() {
        return fechData("/areaCode1", "", new ParameterizedTypeReference<>() {});
    }

    public DataDto<RegionTypeDto> fetchRegionTypeData(String params){
        return fechData("/areaBasedList1", params, new ParameterizedTypeReference<>() {});
        //ParameterizedTypeReference: 제네릭 타입의 정보를 런타임에 유지하기 위해 사용
    }

}
