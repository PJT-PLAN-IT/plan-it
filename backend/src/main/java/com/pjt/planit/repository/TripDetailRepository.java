package com.pjt.planit.repository;

import com.pjt.planit.entity.TripDetail;
import com.pjt.planit.entity.TripPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripDetailRepository extends JpaRepository<TripDetail, Integer> {

}
