package com.pjt.planit.repository;

import com.pjt.planit.entity.FindMateReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FindMateReplyRepository extends JpaRepository<FindMateReply, Integer> {

}
