package com.pjt.planit.business.mate.dto;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import com.pjt.planit.business.tripplan.dto.TripPlanDetailDto;
import com.pjt.planit.business.tripplan.dto.TripPlanDto;
import com.pjt.planit.db.entity.FindMateReply;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MateDetailDTO {
	private Integer findMateNo;
	private String findMateCreateBy;
	private Integer CustNo;
	private String custName;
	private Integer tripPlanNo;
    private String title;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime updateDate;
    private LocalDateTime findMateCreateDate;
    private Integer mateNum;
    private String content;
    private String gender;
    private List<Integer> regions;
    private List<Integer> tripStyles;
    private String twentyYN;
    private String thirtyYN;
    private String fortyYN;
    private String fiftyYN;
    private String thumbnail_img;
	private Integer findMateAppNo;
	private String appAllowYn;
	private String appRefuseYn;
	private LocalDateTime applyDt;
	private LocalDateTime expiredDt;
	private Integer acceptedRequestsCount;
	private Integer tripMateNo;
	private Integer mateCnfrmNo;
	private Integer findMateLikeNo;
	private List<TripPlanDto> tripPlanList = new ArrayList<>();
	private List<TripPlanDetailDto> tripPlanDetailList = new ArrayList<>();
	private List<FindMateReply> mateReplyList = new ArrayList<>();
//	private List<ReplyGroupDTO> groupedReplies; 
}
