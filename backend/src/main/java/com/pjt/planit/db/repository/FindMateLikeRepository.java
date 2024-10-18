package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.FindMateLike;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FindMateLikeRepository extends JpaRepository<FindMateLike, Integer> {
    List<FindMateLike> findAllByCustNo(Integer custNo);

    void deleteByFindMateLikeNo(Integer findMateLikeNo);

    FindMateLike findByFindMateNoAndCustNo(Integer findMateNo, Integer custNo);

    @Query("SELECT l.findMateNo FROM FindMateLike l GROUP BY l.findMateNo ORDER BY COUNT(l) DESC")
    List<Integer> findMateTop10(Pageable pageable);

    void deleteAllByFindMateNo(int findMateNo);
}
