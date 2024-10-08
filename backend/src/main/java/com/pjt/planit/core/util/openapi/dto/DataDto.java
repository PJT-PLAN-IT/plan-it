package com.pjt.planit.core.util.openapi.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class DataDto<T> {
    private ResponseDto<T> response;

}
