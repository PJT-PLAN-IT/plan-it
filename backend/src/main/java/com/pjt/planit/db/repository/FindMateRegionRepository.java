package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.FindMateRegion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FindMateRegionRepository extends JpaRepository<FindMateRegion, Integer> {

}
