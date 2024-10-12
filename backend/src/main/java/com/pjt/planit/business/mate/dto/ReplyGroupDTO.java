package com.pjt.planit.business.mate.dto;

import java.util.List;

import com.pjt.planit.db.entity.FindMateReply;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyGroupDTO {
	 private Integer findMateReplyNo; // Parent reply ID
	    private String reply; // Parent reply content
	    private List<ReplyGroupDTO> responses; // List of child replies
}