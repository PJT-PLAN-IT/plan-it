package com.pjt.planit.repository;

import com.pjt.planit.entity.Cust;
import com.pjt.planit.entity.TripPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustRepository extends JpaRepository<Cust, Integer> {
    Cust findByCustNo(int custNo);

    boolean existsByNickname(String nickname);
}
