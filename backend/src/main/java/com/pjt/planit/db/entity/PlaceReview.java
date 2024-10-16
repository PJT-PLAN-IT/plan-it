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
@Table(name = "T_PLACE_REVIEW")
public class PlaceReview extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_review_no")
    private Integer placeReviewNo;

    @NotNull
    @Column(name = "trip_detail_no")
    private Integer tripDetailNo;

    @NotNull
    @Column(name = "cust_no")
    private Integer custNo;

    @NotNull
    @Column(name = "contentid")
    private String contentid;

    @NotNull
    @Column(name = "star")
    private Integer star;

    @NotNull
    @Column(name = "review")
    private String review;

    @Column(name = "review_img1")
    private String reviewImg1;

    @Column(name = "review_img2")
    private String reviewImg2;

    @Column(name = "review_img3")
    private String reviewImg3;

    @Column(name = "review_img4")
    private String reviewImg4;

    public void review(String reviewImg1, String reviewImg2, String reviewImg3, String reviewImg4) {
        this.reviewImg1 = reviewImg1;
        this.reviewImg2 = reviewImg2;
        this.reviewImg3 = reviewImg3;
        this.reviewImg4 = reviewImg4;
    }
}
