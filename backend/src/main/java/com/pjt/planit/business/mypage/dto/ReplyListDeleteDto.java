package com.pjt.planit.business.mypage.dto;

import lombok.*;

/**
 * 댓글 삭제
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReplyListDeleteDto {

    //T_FIND_MATE_REPLY
    private Integer findMateReplyNo;
}
