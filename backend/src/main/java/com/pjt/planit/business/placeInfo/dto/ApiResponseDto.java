package com.pjt.planit.business.placeInfo.dto;

import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponseDto<T> {

    private List<T> list;
    private int numOfRows;
    private int pageNo;
    private int totalCount;

}
