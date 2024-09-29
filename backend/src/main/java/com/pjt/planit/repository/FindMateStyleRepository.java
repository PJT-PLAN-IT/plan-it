package com.pjt.planit.repository;

import com.pjt.planit.entity.FindMateStyle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FindMateStyleRepository extends JpaRepository<FindMateStyle, Integer> {

}
