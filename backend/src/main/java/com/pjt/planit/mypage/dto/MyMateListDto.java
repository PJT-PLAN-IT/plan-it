package com.pjt.planit.mypage.dto;

import com.pjt.planit.entity.Cust;
import com.pjt.planit.entity.TripPlan;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MyMateListDto {

    private int tripPlanNo;

    private int custNo;

    private String title;

    private LocalDateTime startDt;

    private LocalDateTime endDt;

    private String thumbnailImg;

    private String review;

    private String publicYn;

    private String createYmd;

    public TripPlan toEntity(Cust cust) {
        TripPlan plan = TripPlan.builder()
                .tripPlanNo(tripPlanNo)
                .cust(cust)
                .title(title)
                .startDt(startDt)
                .endDt(endDt)
                .thumbnailImg(thumbnailImg)
                .review(review)
                .publicYn(publicYn)
                .build();
        plan.setCreateDt(LocalDateTime.now());
        return plan;
    }

    public MyMateListDto toDto(TripPlan entity) {
        return MyMateListDto.builder()
                .tripPlanNo(entity.getTripPlanNo())
                .custNo(entity.getCustNo())
                .title(entity.getTitle())
                .startDt(entity.getStartDt())
                .endDt(entity.getEndDt())
                .thumbnailImg(entity.getThumbnailImg())
                .review(entity.getReview())
                .publicYn(entity.getPublicYn())
                .createYmd(entity.getCreateDt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                .build();
    }
}
