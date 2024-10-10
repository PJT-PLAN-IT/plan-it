package com.pjt.planit.business.mypage.service;

import com.pjt.planit.business.mypage.dto.ReplyListDeleteDto;
import com.pjt.planit.business.mypage.dto.ReplyListDto;
import com.pjt.planit.business.mypage.dto.ReviewListDto;
import com.pjt.planit.db.entity.FindMate;
import com.pjt.planit.db.entity.FindMateReply;
import com.pjt.planit.db.repository.FindMateReplyRepository;
import com.pjt.planit.db.repository.FindMateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserReplysService {

    private final FindMateReplyRepository findMateReplyRepository;
    private final FindMateRepository findMateRepository;

    /**
     * 내가 작성한 댓글 조회
     * @param custNo
     * @param page
     * @param size
     * @return
     */
    public List<ReplyListDto> replyList(Integer custNo, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<FindMateReply> replies = findMateReplyRepository.findAllByCustNoOrderByPublicYnDesc(custNo, pageable);

        Integer totalCount = (int)replies.getTotalElements();
        Integer totalPage = replies.getTotalPages();

        List<ReplyListDto> result = replies.stream()
                .map(entity -> {
                    FindMate findMateNo = findMateRepository.findByFindMateNo(entity.getFindMateNo());
                    ReplyListDto convert = convert(entity, findMateNo, totalCount, totalPage);
                    return convert;
                }).toList();
        return result;
    }

    /**
     * 댓글 삭제
     * @param dto
     */
    @Transactional
    public void replyListDelete(ReplyListDeleteDto dto) {
        findMateReplyRepository.deleteByFindMateReplyNo(dto.getFindMateReplyNo());
    }


    /**
     * dto 변환
     * @param findMateReply
     * @param findMate
     * @return
     */
    private ReplyListDto convert(FindMateReply findMateReply, FindMate findMate, Integer totalCount, Integer totalPage) {

        return ReplyListDto.builder()
                .findMateReplyNo(findMateReply.getFindMateReplyNo())
                .findMateNo(findMateReply.getFindMateNo())
                .title(findMate.getTitle())
                .reply(findMateReply.getReply())
                .createDt(findMateReply.getCreateDt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")) )
                .totalCount(totalCount)
                .totalPage(totalPage)
                .build();
    }
}
