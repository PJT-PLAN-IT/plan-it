package com.pjt.planit.repository;

import com.pjt.planit.entity.TripMate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripMateRepository extends JpaRepository<TripMate, Integer> {
}
