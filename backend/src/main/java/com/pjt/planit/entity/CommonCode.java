package com.pjt.planit.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.*;


@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Entity
@Table(name = "T_COMMON_CODE")
public class CommonCode extends BaseEntity {
    @Id
    @Column(name = "code_id")
    private String codeId;

    @Column(name = "upper_code_id")
    private String upperCodeId;

    @NotNull
    @Column(name = "name")
    private String name;

    @Column(name = "value_str")
    private String valueStr;

    @Column(name = "value_int")
    private Integer valueInt;
}