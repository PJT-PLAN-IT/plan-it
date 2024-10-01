package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.FindMate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FindMateRepository extends JpaRepository<FindMate, Integer> {

}
