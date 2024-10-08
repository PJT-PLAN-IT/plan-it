package com.pjt.planit.business.mypage.dto;

import lombok.*;

import java.time.format.DateTimeFormatter;

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
    private String createDt;
    //T_FIND_MATE
    private String title;

    private String reply;

    private Integer totalCount;
    private Integer totalPage;

    public static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
}
