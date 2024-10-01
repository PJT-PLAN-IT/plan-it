package com.pjt.planit.db.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder
@AllArgsConstructor
@Entity
@Table(name = "T_TRIP_PLAN")
public class TripPlan extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trip_plan_no")
    private Integer tripPlanNo;

    @NotNull
    @Column(name = "cust_no")
    private Integer custNo;

    @NotNull
    @Column(name = "title")
    private String title;

    @NotNull
    @Column(name = "start_dt")
    private LocalDateTime startDt;

    @NotNull
    @Column(name = "end_dt")
    private LocalDateTime endDt;

    @Column(name = "thumbnail_img")
    private String thumbnailImg;

    @Column(name = "review")
    private String review;

    @NotNull
    @Column(name = "public_yn")
    private String publicYn;
}
