package com.pjt.planit.business.mate.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MateReplyDTO {

	@JsonProperty("find_mate_reply_no")
	private Integer findMateReplyNo;

	@JsonProperty("find_mate_no")
	private Integer findMateNo;

	@JsonProperty("upper_find_mate_reply_no")
	private Integer upperFindMateReplyNo;

	@JsonProperty("cust_no")
	private Integer custNo;

	private String reply;

	@JsonProperty("public_yn")
	private String publicYn;

	private Integer seq;

	@JsonProperty("create_dt")
	private LocalDateTime createDt;

	@JsonProperty("update_dt")
	private LocalDateTime updateDt;

	@JsonProperty("update_by")
	private String updateBy;

}
