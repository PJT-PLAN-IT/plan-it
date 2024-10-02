package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.TripMate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripMateRepository extends JpaRepository<TripMate, Integer> {

    TripMate findByCustNo(Integer custNo);
}
