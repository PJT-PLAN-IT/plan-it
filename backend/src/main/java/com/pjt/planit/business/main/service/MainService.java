package com.pjt.planit.business.main.service;

import com.pjt.planit.business.main.dto.NewestPlaceDto;
import com.pjt.planit.business.placeInfo.dto.ApiResponseDto;
import com.pjt.planit.core.util.openapi.WebClientHelper;
import com.pjt.planit.core.util.openapi.dto.BodyDto;
import com.pjt.planit.core.util.openapi.dto.DataDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MainService {

    private final WebClientHelper webClientHelper;

    public ApiResponseDto<NewestPlaceDto> newestPlace(String numOfRows, String arrange) {

        String params = "numOfRows=" + numOfRows + "&arrange=" + arrange;

        DataDto<NewestPlaceDto> response = webClientHelper.fetchNewestPlaceData(params);
        BodyDto<NewestPlaceDto> body = response.getResponse().getBody();
        List<NewestPlaceDto> list = body.getItems().getItem();
        List<NewestPlaceDto> filterList  = new ArrayList<>();

        for (NewestPlaceDto dto : list) {
            NewestPlaceDto newestPlaceDto = new NewestPlaceDto();
            newestPlaceDto.setAreacode(dto.getAreacode());
            newestPlaceDto.setContentid(dto.getContentid());
            newestPlaceDto.setContenttypeid(dto.getContenttypeid());
            newestPlaceDto.setFirstimage2(dto.getFirstimage2());
            newestPlaceDto.setTitle(dto.getTitle());

            filterList.add(newestPlaceDto);
        }

        return ApiResponseDto.<NewestPlaceDto>builder()
                .list(filterList)
                .build();
    }
}
