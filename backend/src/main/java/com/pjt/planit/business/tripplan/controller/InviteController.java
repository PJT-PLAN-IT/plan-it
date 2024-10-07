package com.pjt.planit.business.tripplan.controller;

import com.pjt.planit.business.mypage.service.InviteService;
import com.pjt.planit.business.tripplan.dto.CustDto;
import com.pjt.planit.business.tripplan.dto.InviteMateDto;
import com.pjt.planit.core.security.filter.ResponseResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/invite")
@RestController
public class InviteController {

    private final InviteService inviteService;

    public InviteController(InviteService inviteService) {
        this.inviteService = inviteService;
    }

    /**
     * 메이트 초대
     * @param inviteMateDto
     * @return
     */
    @PostMapping
    public ResponseResult<?> inviteMate(@RequestBody InviteMateDto inviteMateDto) {
        inviteService.inviteMate(inviteMateDto);
        return ResponseResult.ofSuccess("success", null);
    }

    /**
     * 친구찾기
     * @param nickname
     */
    @GetMapping("/find-mate")
    public ResponseResult<?> getCust( @RequestParam String nickname) {
        if(nickname.isEmpty()) {
            return ResponseResult.ofSuccess("no nickname value", null);
        }
        CustDto getCust = inviteService.getCust(nickname);
        if(getCust == null) {
            return ResponseResult.ofSuccess("no cust found", null);
        }
        return ResponseResult.ofSuccess("success", getCust);
    }
}
