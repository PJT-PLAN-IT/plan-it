package com.pjt.planit.repository;

import com.pjt.planit.entity.TripPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TripPlanRepository extends JpaRepository<TripPlan, Integer> {
    List<TripPlan> findAllByCustNoAndStartDtBetweenOrderByCreateDtDesc(Integer custNo, LocalDateTime startDt, LocalDateTime endDt);
}
