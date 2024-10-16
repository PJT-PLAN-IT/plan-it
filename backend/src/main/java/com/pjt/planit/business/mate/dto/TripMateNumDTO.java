package com.pjt.planit.business.mate.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class TripMateNumDTO {
 private Integer findMateNo;
 private String name;
}
