package com.pjt.planit.mypage.controller;

import com.pjt.planit.mypage.dto.CustInfoDto;
import com.pjt.planit.mypage.service.UserInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/my_page")
public class UserController {

    private final UserInfoService userInfoService;

    @GetMapping("/{id}")
    public ApiResponse UserInfo(@PathVariable Integer id) {
        CustInfoDto list = userInfoService.userInfo(id);
        return ApiResponse.ok(list);
    }

    @PostMapping("/update")
    public ApiResponse updateUserInfo(@RequestBody CustInfoDto dto) {
        userInfoService.updateUserInfo(dto);
        return ApiResponse.ok();
    }

    @PostMapping("/isExists")
    public ApiResponse emailCheck(@RequestParam String nickName) {
        Boolean check = userInfoService.nickNameCheck(nickName);
        return ApiResponse.ok(check);
    }
}
