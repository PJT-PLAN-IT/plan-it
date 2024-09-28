package com.pjt.planit.repository;

import com.pjt.planit.entity.FindMate;
import com.pjt.planit.entity.TripPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FindMateRepository extends JpaRepository<FindMate, Integer> {

}
