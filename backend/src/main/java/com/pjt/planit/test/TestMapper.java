package com.pjt.planit.test;

import com.pjt.planit.entity.Banner;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TestMapper {
    List<Banner> getBannerList();
    void insertBanner(Banner banner);
}
