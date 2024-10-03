package com.pjt.planit.business.mypage.dto;

import lombok.*;

/**
 * 댓글 리스트 조회
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReplyListDto {

    //T_FIND_MATE_REPLY
    private Integer findMateReplyNo;
    private Integer findMateNo;
    //T_FIND_MATE
    private String title;

    private String reply;

    private Integer totalCount;
    private Integer totalPage;

}
