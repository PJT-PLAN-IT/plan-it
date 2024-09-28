package com.pjt.planit.repository;

import com.pjt.planit.entity.TripPlan;
import com.pjt.planit.entity.TripStyle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripStyleRepository extends JpaRepository<TripStyle, Integer> {

}
