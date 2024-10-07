package com.pjt.planit.core.util.openapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BodyDto<T> {
    private ItemsDto<T> items;
    private int numOfRows;
    private int pageNo;
    private int totalCount;

}


