package com.pjt.planit.business.main.service;

import com.pjt.planit.business.main.dto.FindMateLikeDto;
import com.pjt.planit.business.main.dto.NewestPlaceDto;
import com.pjt.planit.business.placeInfo.dto.ApiResponseDto;
import com.pjt.planit.core.util.openapi.WebClientHelper;
import com.pjt.planit.core.util.openapi.dto.BodyDto;
import com.pjt.planit.core.util.openapi.dto.DataDto;
import com.pjt.planit.db.entity.*;
import com.pjt.planit.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MainService {

    private final WebClientHelper webClientHelper;
    private final FindMateLikeRepository findMateLikeRepository;
    private final FindMateRepository findMateRepository;
    private final FindMateRegionRepository findMateRegionRepository;
    private final FindMateStyleRepository findMateStyleRepository;
    private final TripPlanRepository tripPlanRepository;
    private final CustRepository custRepository;
    private final TripMateRepository tripMateRepository;


    @Value("${file.fileDir}")
    private String fileDir;

    /**
     * 최신관광 컨텐츠
     * @param numOfRows
     * @param arrange
     * @return
     */
    public ApiResponseDto<NewestPlaceDto> newestPlace(String numOfRows, String arrange) {

        String params = "numOfRows=" + numOfRows + "&arrange=" + arrange;

        DataDto<NewestPlaceDto> response = webClientHelper.fetchNewestPlaceData(params);
        BodyDto<NewestPlaceDto> body = response.getResponse().getBody();
        List<NewestPlaceDto> list = body.getItems().getItem();
        List<NewestPlaceDto> filterList  = new ArrayList<>();

        for (NewestPlaceDto dto : list) {
            NewestPlaceDto newestPlaceDto = new NewestPlaceDto();
            newestPlaceDto.setAreacode(dto.getAreacode());
            newestPlaceDto.setContentid(dto.getContentid());
            newestPlaceDto.setContenttypeid(dto.getContenttypeid());
            newestPlaceDto.setFirstimage2(dto.getFirstimage2());
            newestPlaceDto.setTitle(dto.getTitle());

            filterList.add(newestPlaceDto);
        }

        return ApiResponseDto.<NewestPlaceDto>builder()
                .list(filterList)
                .build();
    }

    /**
     * 좋아요 많은 메이트글
     * @return
     */
    public List<FindMateLikeDto> findMateLike() {
        Pageable pageable = PageRequest.of(0, 5);
        List<Integer> mateTop10 = findMateLikeRepository.findMateTop10(pageable);
        List<FindMateLikeDto> result = mateTop10.stream()
                .map(i -> {
                	System.out.println("now running i:");
                	System.out.println(i);
                    FindMate findMate = findMateRepository.findByFindMateNo(i);
                    if (findMate == null) {
                    	System.out.println("FindMate is null");
                        return null;
                    }
                    List<FindMateRegion> findMateRegions = findMateRegionRepository.findByFindMateNo(i);
                    List<FindMateStyle> findMateStyles = findMateStyleRepository.findByFindMateNo(i);
                    TripPlan tripPlanNo = tripPlanRepository.findByTripPlanNo(findMate.getTripPlanNo());
                    if (tripPlanNo == null) {
                       System.out.println("TriplPlanNO is null");
                        return null;
                    }
                    Cust cust = custRepository.findByCustNo(tripPlanNo.getCustNo());
                    if (cust == null) {
                        System.out.println("cust is null");
                        return null;
                    }
                    List<TripMate> tripMate = tripMateRepository.findAllByTripPlanNo(findMate.getTripPlanNo());
                    if (tripMate != null) {
                        List<Integer> collect = tripMate.stream()
                                .map(entity -> {
                                    List<TripMate> custNo = tripMateRepository.findAllByCustNo(entity.getCustNo());
                                    return custNo.size();
                                }).collect(Collectors.toList());
                        FindMateLikeDto convert = convert(findMate, findMateRegions, findMateStyles, tripPlanNo, cust, collect.size());
                        System.out.println("tripMate is not null");
                        return convert;
                    } else {
                        FindMateLikeDto convert = convert(findMate, findMateRegions, findMateStyles, tripPlanNo, cust, 0);
                        System.out.println("tripMate is null");
                        return convert;
                    }
                }).toList();
        System.out.println("returning result");
        System.out.println(result);
        return result;
    }

    private FindMateLikeDto convert(FindMate findMate, List<FindMateRegion> findMateRegions, List<FindMateStyle> findMateStyles,
                                    TripPlan tripPlan, Cust cust, int size) {

        List<Integer> regions = findMateRegions.stream()
                .map(entity -> entity.getContentTypeId())
                .toList();

        List<Integer> tripStyles = findMateStyles.stream()
                .map(entity -> entity.getTripStyleId())
                .toList();

        return FindMateLikeDto.builder()
                .findMateNo(findMate.getFindMateNo())
                .title(findMate.getTitle())
                .genderType(findMate.getGenderType())
                .recruits(findMate.getRecruits())
                .twentyYn(findMate.getTwentyYn())
                .thirtyYn(findMate.getThirtyYn())
                .fortyYn(findMate.getFortyYn())
                .fiftyYn(findMate.getFiftyYn())
                .thumbnailImg(findMate.getThumbnailImg())
                .regions(regions)
                .tripStyles(tripStyles)
                .tripPlanNo(tripPlan.getTripPlanNo())
                .startDt(tripPlan.getStartDt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                .endDt(tripPlan.getEndDt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                .name(cust.getName())
                .tripMateNo(size)
                .build();
    }
}
