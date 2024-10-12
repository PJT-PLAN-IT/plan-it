package com.pjt.planit.business.mate.service;
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
//		findMateReply.setPublicYn(replyDTO.getPublicYn());
		findMateReply.setSeq(replyDTO.getSeq());
		replyRepository.save(findMateReply);
	}

	public void editReply(MateReplyDTO replyDTO) {

		FindMateReply findMateReply = replyRepository.findByFindMateReplyNoAndCustNo(replyDTO.getFindMateReplyNo(), replyDTO.getCustNo());
		findMateReply.setReply(replyDTO.getReply());
		System.out.println(findMateReply);
		replyRepository.save(findMateReply);
	}

	public void deleteReply(MateReplyDTO dto) {
		FindMateReply reply = replyRepository.findByFindMateReplyNo(dto.getFindMateReplyNo());
		if(reply.getCustNo() == dto.getCustNo()) {
			replyRepository.deleteById(dto.getFindMateReplyNo());
		}
	}
	
}
