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
@Table(name = "T_INVITE")
public class Invite extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invite_no")
    private Integer inviteNo;

    @NotNull
    @Column(name = "trip_plan_no")
    private Integer tripPlanNo;

    @NotNull
    @Column(name = "cust_no")
    private Integer custNo;

    @Column(name = "invite_cust_no")
    private Integer inviteCustNo;

    @Column(name = "invite_dt")
    private LocalDateTime inviteDt;

    @Column(name = "expired_dt")
    private LocalDateTime expiredDt;

    @Column(name = "accept_yn")
    private String acceptYn;

    @Column(name = "reject_yn")
    private String rejectYn;
}
