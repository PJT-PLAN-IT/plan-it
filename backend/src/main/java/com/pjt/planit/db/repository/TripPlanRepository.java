package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.TripPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TripPlanRepository extends JpaRepository<TripPlan, Integer> {
    List<TripPlan> findAllByCustNoAndStartDtBetweenOrderByCreateDtDesc(Integer custNo, LocalDateTime startDt, LocalDateTime endDt);

    List<TripPlan> findAllByCustNo(Integer custNo);  //내가 작성한 여행계획 조회

    TripPlan findByTripPlanNo(Integer tripPlanNo);

    TripPlan findByTripPlanNoAndStartDtBetweenOrderByCreateDtDesc(Integer planNo, LocalDateTime startDt, LocalDateTime endDt);

}
