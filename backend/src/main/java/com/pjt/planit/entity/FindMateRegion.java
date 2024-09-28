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
@Table(name = "T_FIND_MATE_REGION")
public class FindMateRegion extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "find_mate_region_no")
    private Integer findMateRegionNo;

    @NotNull
    @Column(name = "find_mate_no")
    private Integer findMateNo;

    @NotNull
    @Column(name = "content_type_id")
    private Integer contentTypeId;
}