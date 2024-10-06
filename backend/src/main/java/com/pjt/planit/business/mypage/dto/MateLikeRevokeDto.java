package com.pjt.planit.business.mypage.dto;

import lombok.*;

/**
 * 좋아요 취소
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MateLikeRevokeDto {

    //T_FIND_MATE_LIKE
    private Integer findMateLikeNo;
}
