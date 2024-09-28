package com.pjt.planit.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.NotNull;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Entity
@Table(name = "T_TRIP_MATE")
public class TripMate extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trip_mate_no")
    private Integer tripMateNo;

    @NotNull
    @Column(name = "trip_plan_no")
    private Integer tripPlanNo;

    @NotNull
    @Column(name = "cust_no")
    private Integer custNo;
}