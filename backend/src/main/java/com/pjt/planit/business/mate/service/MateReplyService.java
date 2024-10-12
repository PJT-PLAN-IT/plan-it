package com.pjt.planit.business.mate.service;

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

	public void submitReply(MateReplyDTO replyDTO) {

		FindMateReply findMateReply = new FindMateReply();
		findMateReply.setFindMateNo(replyDTO.getFindMateNo());
//		findMateReply.setUpperFindMateReplyNo(replyDTO.getUpperFindMateReplyNo());
		findMateReply.setCustNo(replyDTO.getCustNo());
		findMateReply.setReply(replyDTO.getReply());
		findMateReply.setPublicYn(replyDTO.getPublicYn());
		findMateReply.setSeq(replyDTO.getSeq());
		replyRepository.save(findMateReply);
	}

	public void editReply(MateReplyDTO replyDTO) {

		FindMateReply findMateReply = replyRepository.findByFindMateReplyNoAndCustNo(replyDTO.getFindMateReplyNo(),
				replyDTO.getCustNo());
		findMateReply.setReply(replyDTO.getReply());
		System.out.println(findMateReply);
		replyRepository.save(findMateReply);
	}

	public void deleteReply(MateReplyDTO dto) {
		FindMateReply reply = replyRepository.findByFindMateReplyNo(dto.getFindMateReplyNo());
		if (reply.getCustNo() == dto.getCustNo()) {
			replyRepository.deleteById(dto.getFindMateReplyNo());
		}
	}

	public List<FindMateReply> getRepliesByFindMateNo(int findMateNo) {
		List<FindMateReply> replies = replyRepository.findByFindMateNo(findMateNo);
		System.out.println(replies);
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
