package com.pjt.planit.business.main.controller;

import com.pjt.planit.business.main.dto.FindMateLikeDto;
import com.pjt.planit.business.main.service.MainService;
import com.pjt.planit.core.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


@Controller
@ResponseBody
@RequiredArgsConstructor
public class MainController {

    private final MainService mainService;

    @GetMapping("/")
    public String mainP() {
        return "Main Controller";
    }

    /**
     * 최신관광컨텐츠
     * @param numOfRows
     * @param arrange
     * @return
     */
    @GetMapping("/planit/newest-place")
    public ApiResponse newestPlace(@RequestParam(defaultValue = "5") String numOfRows,
                                   @RequestParam(defaultValue = "D") String arrange) {
        return ApiResponse.ok("ok", mainService.newestPlace(numOfRows, arrange));
    }

    /**
     * 좋아요 많은 메이트글
     * @return
     */
    @GetMapping("/planit/mates-like")
    public ApiResponse matesLike() {
        List<FindMateLikeDto> list = mainService.findMateLike();
        return ApiResponse.ok("ok", list);
    }

}
