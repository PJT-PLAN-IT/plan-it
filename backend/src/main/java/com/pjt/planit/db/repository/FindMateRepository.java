package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.FindMate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;

@Repository
public interface FindMateRepository extends JpaRepository<FindMate, Integer> {

    FindMate findByTripPlanNoAndStartDtBetweenOrderByCreateDtDesc(Integer tripPlanNo, LocalDateTime startDt, LocalDateTime endDt);  //내가 작성한 메이트 공고찾기

    FindMate findByFindMateNo(Integer findMateNo);

    FindMate findByTripPlanNo(Integer tripPlanNo);

}
