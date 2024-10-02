package com.pjt.planit.test;

import com.pjt.planit.db.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestRepository extends JpaRepository<Banner, Long> {

}
