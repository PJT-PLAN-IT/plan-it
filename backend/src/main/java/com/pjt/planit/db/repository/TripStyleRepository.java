package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.TripStyle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripStyleRepository extends JpaRepository<TripStyle, Integer> {

}
