package com.pjt.planit.repository;

import com.pjt.planit.entity.FindMate;
import com.pjt.planit.entity.FindMateApply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FindMateApplyRepository extends JpaRepository<FindMateApply, Integer> {

    List<FindMateApply> findAllByfindMateApplyNo(Integer findMateApplyNo);  //내가 작성한 메이트 공고에 지원자 찾기

    //FindMateApply findByFindMateNoAndCustNoAndApplyDtBetweenOrderByCreateDtDesc(Integer findMateNo, Integer custNo, LocalDateTime applyDt, LocalDateTime expiredDt);

    List<FindMateApply> findAllByCustNoAndApplyDtBetweenOrderByCreateDtDesc(Integer custNo, LocalDateTime applyDt, LocalDateTime expiredDt);
}
