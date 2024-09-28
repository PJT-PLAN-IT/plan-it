package com.pjt.planit.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.NotNull;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Entity
@Table(name = "T_FIND_MATE_STYLE")
public class FindMateStyle extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "find_mate_style_no")
    private Integer findMateStyleNo;

    @NotNull
    @Column(name = "find_mate_no")
    private Integer findMateNo;

    @NotNull
    @Column(name = "trip_style_id")
    private Integer tripStyleId;
}
