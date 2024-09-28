package com.pjt.planit.test;

import com.pjt.planit.entity.Banner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/test")
public class TestController {
    @Autowired
    private TestService testService;

    @GetMapping("/mybatis/banner/list")
    public List<Banner> getBannerListByMybatis() {
        return testService.getBannerListByMybatis();
    }

    @PostMapping("/mybatis/banner")
    public void insertBannerByMybatis(@RequestBody Banner banner) {
        testService.insertBannerByMybatis(banner);
    }

    @GetMapping("/jpa/banner/list")
    public List<Banner> getBannerListByJpa() {
        return testService.getBannerListByJpa();
    }

    @PostMapping("/jpa/banner")
    public void insertBannerByJpa(@RequestBody Banner banner) {
        testService.insertBannerByJpa(banner);
    }
}
