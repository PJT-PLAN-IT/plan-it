package com.pjt.planit.mypage.repository;

import com.pjt.planit.mypage.TripPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyMateListRepository extends JpaRepository<TripPlan, Long> {

    List<TripPlan> findAllByCustNoOrderByCreateDtDesc(int custNo);
}
