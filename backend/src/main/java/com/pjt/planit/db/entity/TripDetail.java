package com.pjt.planit.db.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Entity
@Table(name = "T_TRIP_DETAIL")
public class TripDetail extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trip_detail_no")
    private Integer tripDetailNo;

    @NotNull
    @Column(name = "trip_plan_no")
    private Integer tripPlanNo;

    @Column(name = "plan_dt")
    private LocalDateTime planDt;

    @Column(name = "seq")
    private Integer seq;

    @NotNull
    @Column(name = "contentid")
    private String contentid;

    @Column(name = "content_type_id")
    private String contentTypeId;

    @Column(name = "title")
    private String title;

    @Column(name = "address")
    private String address;

    @Column(name = "mapx")
    private Float mapx;

    @Column(name = "mapy")
    private Float mapy;
}
