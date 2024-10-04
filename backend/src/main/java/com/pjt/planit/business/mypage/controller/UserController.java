package com.pjt.planit.business.mypage.controller;

import com.pjt.planit.business.mypage.dto.CustInfoDto;
import com.pjt.planit.business.mypage.service.UserInfoService;
import com.pjt.planit.core.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/my-page")
public class UserController {

    private final UserInfoService userInfoService;

    @GetMapping("/{id}")
    public ApiResponse UserInfo(@PathVariable Integer id) {
        CustInfoDto list = userInfoService.userInfo(id);
        return ApiResponse.ok("ok", list);
    }

    @PostMapping("/update")
    public ApiResponse updateUserInfo(@RequestBody CustInfoDto dto) {
        Boolean isExist = userInfoService.nickNameCheck(dto.getNickname());
        if (isExist) {
            return ApiResponse.ok("닉네임 중복");
        }

        //token 인증값에서 user email 가지고 옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        dto.setEmail(email);
        userInfoService.updateUserInfo(dto);
        return ApiResponse.ok("ok");
    }

    @PostMapping("/check")
    public ApiResponse emailCheck(@RequestParam String nickName) {
        Boolean check = userInfoService.nickNameCheck(nickName);
        return ApiResponse.ok("ok",check);
    }
}
