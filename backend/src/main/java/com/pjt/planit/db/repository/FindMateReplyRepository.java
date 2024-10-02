package com.pjt.planit.db.repository;

import com.pjt.planit.db.entity.FindMateReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FindMateReplyRepository extends JpaRepository<FindMateReply, Integer> {

}
