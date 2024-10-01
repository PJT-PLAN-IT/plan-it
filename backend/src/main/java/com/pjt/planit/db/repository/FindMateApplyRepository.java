package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.FindMateApply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FindMateApplyRepository extends JpaRepository<FindMateApply, Integer> {

}
