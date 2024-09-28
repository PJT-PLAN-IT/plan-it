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
@Table(name = "T_FIND_MATE_REPLY")
public class FindMateReply extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "find_mate_reply_no")
    private Integer findMateReplyNo;

    @NotNull
    @Column(name = "find_mate_no")
    private Integer findMateNo;

    @Column(name = "upper_find_mate_reply_no")
    private Integer upperFindMateReplyNo;

    @NotNull
    @Column(name = "cust_no")
    private Integer custNo;

    @NotNull
    @Column(name = "reply")
    private String reply;

    @NotNull
    @Column(name = "public_yn")
    private String publicYn;

    @Column(name = "seq")
    private Integer seq;
}
