package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.TripDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripDetailRepository extends JpaRepository<TripDetail, Integer> {

}
