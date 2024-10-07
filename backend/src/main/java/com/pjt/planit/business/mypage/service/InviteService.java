package com.pjt.planit.business.mypage.service;

import com.pjt.planit.business.tripplan.dto.CustDto;
import com.pjt.planit.business.tripplan.dto.InviteMateDto;
import com.pjt.planit.db.entity.Cust;
import com.pjt.planit.db.entity.Invite;
import com.pjt.planit.db.repository.CustRepository;
import com.pjt.planit.db.repository.InviteRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InviteService {

    private final InviteRepository inviteRepository;
    private final CustRepository custRepository;

    public InviteService(InviteRepository inviteRepository, CustRepository custRepository) {
        this.inviteRepository = inviteRepository;
        this.custRepository = custRepository;
    }

    /**
     * 메이트 초대
     * @param inviteMateDto
     */
    public void inviteMate(InviteMateDto inviteMateDto) {
        Invite invite = Invite.builder()
                .tripPlanNo(inviteMateDto.getTripPlanNo())
                .custNo(inviteMateDto.getCustNo())
                .inviteCustNo(inviteMateDto.getInviteCustNo())
                .inviteDt(inviteMateDto.getInviteDt())
                .expiredDt(inviteMateDto.getExpiredDt())
                .acceptYn(inviteMateDto.getAcceptYn())
                .rejectYn(inviteMateDto.getRejectYn())
                .build();
        inviteRepository.save(invite);
    }


    /**
     * Nickname으로 Cust정보 가지고 오기
     * @param nickname
     */
    public CustDto getCust(String nickname) {
        Optional<Cust> cust = custRepository.findByNicknameAndSecessionYn(nickname, "N");
        if(cust.isPresent()) {
            Cust getCust = cust.get();
            CustDto custDto = new CustDto();
            custDto.setCustNo(getCust.getCustNo());
            custDto.setNickname(getCust.getNickname());
            custDto.setEmail(getCust.getEmail());
            return custDto;
        }
        return null;
    }
}
