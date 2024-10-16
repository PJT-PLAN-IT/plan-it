package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.TripDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TripDetailRepository extends JpaRepository<TripDetail, Integer> {
    Optional<List<TripDetail>> findAllByTripPlanNo(Integer tripPlanNo);

    void deleteAllByTripPlanNo(Integer tripPlanNo);

    Optional<TripDetail> findByTripDetailNo(Integer tripDetailNo);

	List<TripDetail> getTripDetailByTripPlanNo(int tripPlanNo);
}
