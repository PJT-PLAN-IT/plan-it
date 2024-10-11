package com.pjt.planit.db.repository;
import com.pjt.planit.db.entity.FindMateRegion;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FindMateRegionRepository extends JpaRepository<FindMateRegion, Integer> {

	List<FindMateRegion> findByFindMateNo(Integer findMateNo);

	@Transactional
	@Modifying
	@Query("DELETE FROM FindMateRegion r WHERE r.findMateNo = :findMateNo AND r.contentTypeId = :contentTypeId")
	void deleteByFindMateNoAndContentTypeId(@Param("findMateNo")Integer findMateNo, @Param("contentTypeId")Integer contentTypeId);
	void deleteAllByFindMateNo(int findMateNo);
}
