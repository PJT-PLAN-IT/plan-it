package com.pjt.planit.business.main.controller;

import com.pjt.planit.business.main.service.MainService;
import com.pjt.planit.core.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@ResponseBody
@RequiredArgsConstructor
public class MainController {

    private final MainService mainService;

    @GetMapping("/")
    public String mainP() {
        return "Main Controller";
    }

    //최신관광 컨텐츠
    @GetMapping("/planit/newest-place")
    public ApiResponse newestPlace(@RequestParam(defaultValue = "5") String numOfRows,
                                   @RequestParam(defaultValue = "D") String arrange) {
        return ApiResponse.ok("ok", mainService.newestPlace(numOfRows, arrange));
    }

}
