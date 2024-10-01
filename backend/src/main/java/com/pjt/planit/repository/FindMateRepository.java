package com.pjt.planit.repository;

import com.pjt.planit.entity.FindMate;
import com.pjt.planit.entity.TripPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FindMateRepository extends JpaRepository<FindMate, Integer> {

    FindMate findByTripPlanNoAndStartDtBetweenOrderByCreateDtDesc(Integer tripPlanNo, LocalDateTime startDt, LocalDateTime endDt);  //내가 작성한 메이트 공고찾기

    List<FindMate> findAllByOrderByCreateDtDesc();
}
