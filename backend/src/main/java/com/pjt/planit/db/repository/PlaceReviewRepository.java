package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.PlaceReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceReviewRepository extends JpaRepository<PlaceReview, Integer> {

    Page<PlaceReview> findAllByContentid(String contentid, Pageable pageable);

    List<PlaceReview> findAllByContentid(String contentid);

    PlaceReview findByPlaceReviewNo(Integer placeReviewNo);

    Page<PlaceReview> findAllByCustNo(Integer custNo, Pageable pageable);

    void deleteByPlaceReviewNo(Integer placeReviewNo);

}
