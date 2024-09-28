package com.pjt.planit.repository;

import com.pjt.planit.entity.TripPlan;
import com.pjt.planit.entity.TripPlanLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripPlanLikeRepository extends JpaRepository<TripPlan, Integer> {

}
