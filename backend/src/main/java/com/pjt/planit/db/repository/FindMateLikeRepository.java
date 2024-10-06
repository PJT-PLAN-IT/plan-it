package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.FindMateLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FindMateLikeRepository extends JpaRepository<FindMateLike, Integer> {
    List<FindMateLike> findAllByCustNo(Integer custNo);

    void deleteByFindMateLikeNo(Integer findMateLikeNo);
}
