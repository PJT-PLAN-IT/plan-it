package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.FindMateStyle;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FindMateStyleRepository extends JpaRepository<FindMateStyle, Integer> {

	List<FindMateStyle> findByFindMateNo(Integer findMateNo);

	@Transactional
	@Modifying
	@Query("DELETE FROM FindMateStyle f WHERE f.findMateNo = :findMateNo AND f.tripStyleId = :tripStyleId")
	void deleteByFindMateNoAndTripStyleId(@Param("findMateNo") Integer findMateNo,
			@Param("tripStyleId") Integer tripStyleId);

	void deleteAllByFindMateNo(int findMateNo);

	@Query("SELECT s.tripStyleId FROM FindMateStyle s WHERE s.findMateNo = :findMateNo")
	List<Integer> findTripStyleIdsByFindMateNo(@Param("findMateNo") int findMateNo);

}
