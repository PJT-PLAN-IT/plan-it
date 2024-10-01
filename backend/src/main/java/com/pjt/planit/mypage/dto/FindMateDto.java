package com.pjt.planit.mypage.dto;



import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * T_FIND_MATE	메이트 공고
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FindMateDto {

    private Integer findMateNo;
    private Integer tripPlanNo;
    private String title;
    private String content;
    private LocalDateTime startDt;
    private LocalDateTime endDt;
    private Integer recruits;
    private List<FindMateApplyDto> mateApplyList;
    private String custName;

}
