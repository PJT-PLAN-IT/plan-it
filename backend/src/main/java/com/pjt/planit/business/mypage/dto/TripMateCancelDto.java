package com.pjt.planit.business.mypage.dto;

import lombok.*;

/**
 * 신청한 메이트글 취소
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TripMateCancelDto {

    //T_FIND_MATE
    private Integer findMateNo;
    private Integer custNo;
}
