package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.FindMateStyle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FindMateStyleRepository extends JpaRepository<FindMateStyle, Integer> {

}
