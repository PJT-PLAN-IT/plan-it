package com.pjt.planit.business.mate.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.pjt.planit.business.mate.dto.MateReplyDTO;
import com.pjt.planit.db.entity.FindMateReply;
import com.pjt.planit.db.repository.FindMateReplyRepository;

@Service
public class MateReplyService {

	private final FindMateReplyRepository replyRepository;

	public MateReplyService(FindMateReplyRepository replyRepository) {
		this.replyRepository = replyRepository;
	}

	public int submitReply(MateReplyDTO replyDTO) {

		FindMateReply findMateReply = new FindMateReply();
		findMateReply.setFindMateNo(replyDTO.getFindMateNo());
		findMateReply.setCustNo(replyDTO.getCustNo());
		findMateReply.setReply(replyDTO.getReply());
		findMateReply.setPublicYn(replyDTO.getPublicYn());
		findMateReply.setSeq(replyDTO.getSeq());
		findMateReply.setCreateDt(LocalDateTime.now());
		replyRepository.save(findMateReply);
		int replyNo = findMateReply.getFindMateReplyNo();
		return replyNo;
	}

	public void editReply(MateReplyDTO replyDTO) {

		FindMateReply findMateReply = replyRepository.findByFindMateReplyNoAndCustNo(replyDTO.getFindMateReplyNo(),
				replyDTO.getCustNo());
		findMateReply.setReply(replyDTO.getReply());
		System.out.println(findMateReply);
		replyRepository.save(findMateReply);
	}

	public void deleteReply(int findMateReplyNo) {
	
			replyRepository.deleteById(findMateReplyNo);
		
	}

	public List<FindMateReply> getRepliesByFindMateNo(int findMateNo) {
		List<FindMateReply> replies = replyRepository.findByFindMateNo(findMateNo);
		
		return replies;
	}

	private MateReplyDTO convertToDTO(FindMateReply reply) {
		MateReplyDTO dto = new MateReplyDTO();
		dto.setFindMateReplyNo(reply.getFindMateReplyNo());
		dto.setFindMateNo(reply.getFindMateNo());
		dto.setCustNo(reply.getCustNo());
		dto.setReply(reply.getReply());
		dto.setPublicYn(reply.getPublicYn());
		dto.setSeq(reply.getSeq());
		System.out.println(dto);
		return dto;
	}

}
