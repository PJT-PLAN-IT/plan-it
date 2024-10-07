package com.pjt.planit.business.mate.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//@Component
public class MateWriteDTO {
    private String title;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int mateNum;
    private String content;
    private String gender;
    private String thumbnail;
    private List<Integer> regions;
    private List<Integer> tripStyles;
    private String twentyYN;
    private String thirtyYN;
    private String fortyYN;
    private String fiftyYN;
   
}
