package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.TripPlanLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripPlanLikeRepository extends JpaRepository<TripPlanLike, Integer> {

}
