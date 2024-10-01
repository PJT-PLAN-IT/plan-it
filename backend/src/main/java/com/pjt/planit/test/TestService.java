package com.pjt.planit.test;

import com.pjt.planit.db.entity.Banner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {
    @Autowired
    private TestMapper testMapper;
    @Autowired
    private TestRepository testRepository;

    public List<Banner> getBannerListByMybatis() {
        return testMapper.getBannerList();
    }

    public void insertBannerByMybatis(Banner banner) {
        testMapper.insertBanner(banner);
    }

    public List<Banner> getBannerListByJpa() {
        return testRepository.findAll();
    }

    public void insertBannerByJpa(Banner banner) {
        testRepository.save(banner);
    }
}
