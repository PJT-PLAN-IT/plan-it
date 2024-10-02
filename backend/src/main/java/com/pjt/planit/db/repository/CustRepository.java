package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.Cust;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustRepository extends JpaRepository<Cust, Integer> {

    Boolean existsByEmail(String email);

    Cust findAllByEmail(String email);

    Cust findByCustNo(int custNo);
    
    boolean existsByNickname(String nickname);
}
