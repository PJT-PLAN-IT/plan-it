package com.pjt.planit.business.mate.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MateReplyDTO {

	private Integer findMateReplyNo;
	private Integer findMateNo;
	private Integer upperFindMateReplyNo;
	private Integer custNo;
	private String reply;
	private String publicYn;
	private Integer seq;
}
