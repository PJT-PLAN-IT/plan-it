package com.pjt.planit.repository;

import com.pjt.planit.entity.FindMateApply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FindMateApplyRepository extends JpaRepository<FindMateApply, Integer> {

}
