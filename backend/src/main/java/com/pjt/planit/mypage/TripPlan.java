package com.pjt.planit.mypage;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "T_TRIP_PLAN", schema = "planit")
public class TripPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trip_plan_no")
    private int tripPlanNo;

    @Column(name = "cust_no")
    private int custNo;

    private String title;

    @Column(name = "start_dt")
    private LocalDateTime startDt;

    @Column(name = "end_dt")
    private LocalDateTime endDt;

    @Column(name = "thumbnail_img")
    private String thumbnailImg;

    private String review;

    @Column(name = "public_yn")
    private String publicYn;

    public LocalDateTime createDt;
}
