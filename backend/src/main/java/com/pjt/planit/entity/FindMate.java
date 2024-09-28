package com.pjt.planit.entity;

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
@Table(name = "T_FIND_MATE")
public class FindMate extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "find_mate_no")
    private Integer findMateNo;

    @Column(name = "trip_plan_no")
    private Integer tripPlanNo;

    @NotNull
    @Column(name = "title")
    private String title;

    @NotNull
    @Column(name = "content")
    private String content;

    @NotNull
    @Column(name = "start_dt")
    private LocalDateTime startDt;

    @NotNull
    @Column(name = "end_dt")
    private LocalDateTime endDt;

    @Column(name = "gender_type")
    private String genderType;

    @Column(name = "recruits")
    private Integer recruits;

    @Column(name = "twenty_yn")
    private String twentyYn;

    @Column(name = "thirty_yn")
    private String thirtyYn;

    @Column(name = "forty_yn")
    private String fortyYn;

    @Column(name = "fifty_yn")
    private String fiftyYn;
}