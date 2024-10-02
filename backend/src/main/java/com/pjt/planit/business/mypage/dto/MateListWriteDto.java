package com.pjt.planit.business.mypage.dto;



import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 내가 작성한 메이트글 조회
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MateListWriteDto {

    //T_FIND_MATE
    private Integer findMateNo;
    private String title;
    private String content;
    private Integer recruits;
    private String thumbnailImg;
    //T_TRIP_PLAN
    private LocalDateTime startDt;
    private LocalDateTime endDt;

    private List<MateApplyDto> mateApplyList;

}
