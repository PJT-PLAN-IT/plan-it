package com.pjt.planit.business.cust.controller;

import com.pjt.planit.business.cust.dto.CustJoinDto;
import com.pjt.planit.business.cust.service.JoinCustService;
import com.pjt.planit.core.config.ApiResponse;
import com.pjt.planit.core.security.filter.ResponseResult;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/join")
public class JoinCustController {

    private final JoinCustService joinCustService;

    public JoinCustController(JoinCustService joinCustService) {
        this.joinCustService = joinCustService;
    }

    /**
     * 회원 가입
     *
     * @param custJoinDto p1
     * @return ResponseResult<?>
     */
    @PostMapping
    public ResponseResult<?> signup(@RequestBody CustJoinDto custJoinDto) {
        joinCustService.signup(custJoinDto);
        return ResponseResult.ofSuccess("success", null);
    }

    /**
     * 이메일 중복확인
     * @param email
     * @return
     */
    @PostMapping("/emailCheck")
    public ResponseResult<?> emailCheck(@RequestParam String email) {
        Boolean check = joinCustService.emailCheck(email);
        return ResponseResult.ofSuccess("success", check);
    }

    /**
     * 닉네임 중복확인
     * @param nickName
     * @return
     */
    @PostMapping("/nickNameCheck")
    public ApiResponse nickNameCheck(@RequestParam String nickName) {
        Boolean check = joinCustService.nickNameCheck(nickName);
        return ApiResponse.ok("ok",check);
    }


}
