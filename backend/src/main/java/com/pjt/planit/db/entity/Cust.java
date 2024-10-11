package com.pjt.planit.db.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;

@DynamicInsert
@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Entity
@Table(name = "T_CUST")
public class Cust extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cust_no")
    private Integer custNo;

    @NotNull
    @Column(name = "email")
    private String email;

    @Column(name = "pw")
    private String pw;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "nickname")
    private String nickname;

    @NotNull
    @Column(name = "phone_number")
    private String phoneNumber;

    @NotNull
    @Column(name = "birth_dt")
    private LocalDateTime birthDt;

    @NotNull
    @Column(name = "gender")
    private String gender; // M or W

    @Column(name = "secession_yn")
    @ColumnDefault("N")
    private String secessionYn; //Y or N

    @Column(name = "secession_dt")
    private LocalDateTime secessionDt;

    @NotNull
    @Column(name = "join_dt")
    private LocalDateTime joinDt;

    @Column(name = "profile_img")
    private String profileImg;

    @Column(name = "intro")
    private String intro;

    public void updateUserInfo(String pw, String name, String nickname, String phoneNumber, LocalDateTime birthDt, String gender) {
        this.pw = pw;
        this.name = name;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
        this.birthDt = birthDt;
        this.gender = gender;
    }
}