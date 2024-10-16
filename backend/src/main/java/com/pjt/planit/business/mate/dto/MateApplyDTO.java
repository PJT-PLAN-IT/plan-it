package com.pjt.planit.business.mate.dto;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MateApplyDTO {

	private Integer findMateApplyNo;
	private Integer findMateNo;
	private Integer custNo;
    private Integer tripPlanNo;
	private String allowYn;
	private String refuseYn;
	private LocalDateTime applyDt;
	private LocalDateTime expiredDt;
	
	

}
