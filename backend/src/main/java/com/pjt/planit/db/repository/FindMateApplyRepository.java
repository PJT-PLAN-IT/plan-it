package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.FindMateApply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FindMateApplyRepository extends JpaRepository<FindMateApply, Integer> {

    List<FindMateApply> findAllByfindMateNo(Integer findMateApplyNo);  //내가 작성한 메이트 공고에 지원자 찾기

    List<FindMateApply> findAllByCustNoAndApplyDtBetweenOrderByCreateDtDesc(Integer custNo, LocalDateTime applyDt, LocalDateTime expiredDt);

    List<FindMateApply> findBycustNo(Integer custNo);


}
