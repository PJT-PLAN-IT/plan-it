package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.TripMate;
import jakarta.transaction.Transactional;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TripMateRepository extends JpaRepository<TripMate, Integer> {

	List<TripMate> findAllByCustNo(Integer custNo);

	TripMate findByTripMateNo(Integer tripMateNo);

	TripMate findByTripPlanNoAndCustNo(Integer tripPlanNo, Integer custNo);


}
