package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.TripMate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripMateRepository extends JpaRepository<TripMate, Integer> {

    List<TripMate> findAllByCustNo(Integer custNo);

    TripMate findByTripMateNo(Integer tripMateNo);

    TripMate findByTripPlanNoAndCustNo(Integer tripPlanNo, Integer custNo);

}
