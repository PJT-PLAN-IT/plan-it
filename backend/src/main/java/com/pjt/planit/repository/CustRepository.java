package com.pjt.planit.repository;

import com.pjt.planit.entity.Cust;
import com.pjt.planit.entity.TripPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustRepository extends JpaRepository<Cust, Integer> {
    Optional<Cust> findByEmail(String email);
}
