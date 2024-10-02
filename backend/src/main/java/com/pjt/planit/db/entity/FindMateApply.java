package com.pjt.planit.db.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.NotNull;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Entity
@Table(name = "T_FIND_MATE_APPLY")
public class FindMateApply extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "find_mate_apply_no")
    private Integer findMateApplyNo;

    @NotNull
    @Column(name = "find_mate_no")
    private Integer findMateNo;

    @NotNull
    @Column(name = "cust_no")
    private Integer custNo;

    @Column(name = "allow_yn")
    private String allowYn;

    @Column(name = "refuse_yn")
    private String refuseYn;

    @NotNull
    @Column(name = "apply_dt")
    private LocalDateTime applyDt;

    @NotNull
    @Column(name = "expired_dt")
    private LocalDateTime expiredDt;


    public void updateYn(String allowYn, String refuseYn){
        if(StringUtils.hasText(allowYn)){
            this.allowYn = allowYn;
        }

        if(StringUtils.hasText(refuseYn)){
            this.refuseYn = refuseYn;
        }
    }
}