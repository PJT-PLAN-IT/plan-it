package com.pjt.planit.business.placeInfo.service;

import com.pjt.planit.business.placeInfo.dto.ApiResponseDto;
import com.pjt.planit.business.placeInfo.dto.CommonInfoDto;
import com.pjt.planit.business.placeInfo.dto.PlaceReviewDto;
import com.pjt.planit.core.util.openapi.WebClientHelper;
import com.pjt.planit.core.util.openapi.dto.BodyDto;
import com.pjt.planit.core.util.openapi.dto.DataDto;
import com.pjt.planit.db.entity.Cust;
import com.pjt.planit.db.entity.PlaceReview;
import com.pjt.planit.db.repository.CustRepository;
import com.pjt.planit.db.repository.PlaceReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PlaceDetailService {

    private final PlaceReviewRepository placeReviewRepository;
    private final CustRepository custRepository;
    private final WebClientHelper webClientHelper;

    @Value("${file.fileDir}")
    private String fileDir;
    @Value("${file.readFileDir}")
    private String readFileDir;

    /**
     * 여행장소 리뷰 조회
     * @param contentid
     * @param page
     * @param size
     * @return
     */
    public List<PlaceReviewDto> reviews(String contentid, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createDt").descending());
        Page<PlaceReview> pageReviews = placeReviewRepository.findAllByContentid(contentid, pageable);

        List<PlaceReview> reviews = pageReviews.getContent();
        System.out.println("데이터 개수: " + reviews.size());

        //페이징된 리뷰 수
        Integer totalCount  = (int)pageReviews.getTotalElements();
        int totalPage = pageReviews.getTotalPages();

        //전체 별점 합산 구하기
        List<PlaceReview> placeReviews = placeReviewRepository.findAllByContentid(contentid);
        double totalStar = placeReviews.stream()
                .mapToDouble(entity -> entity.getStar().doubleValue())
                .sum();

        double starAvg = totalStar / totalCount;

        // 소수점 한 자리까지 포맷팅
        String formattedStarAvg = String.format("%.1f", starAvg);

        List<PlaceReviewDto> result = pageReviews.stream()
                .map(entity -> {
                    Cust cust = custRepository.findByCustNo(entity.getCustNo());
                    PlaceReviewDto convert = convert(formattedStarAvg, entity, cust, totalCount, totalPage);
                    return convert;
                }).toList();
        return result;
    }

    /**
     * 공통정보 조회
     * @param contentId
     * @param defaultYN
     * @param firstImageYN
     * @param areacodeYN
     * @param addrinfoYN
     * @param overviewYN
     * @return
     */
    public ApiResponseDto<CommonInfoDto> commonInfo(String contentId, String defaultYN, String firstImageYN,
                                                    String areacodeYN, String addrinfoYN, String overviewYN) {

        String params = "contentId=" + contentId + "&defaultYN=" + defaultYN +
                "&firstImageYN=" + firstImageYN + "&areacodeYN=" + areacodeYN +
                "&addrinfoYN=" + addrinfoYN + "&overviewYN=" + overviewYN;

        DataDto<CommonInfoDto> response = webClientHelper.fetchCommonInfoData(params);
        BodyDto<CommonInfoDto> body = response.getResponse().getBody();
        List<CommonInfoDto> list = body.getItems().getItem();
        List<CommonInfoDto> filterList  = new ArrayList<>();

        for (CommonInfoDto dto : list) {
            CommonInfoDto commonInfoDto = new CommonInfoDto();
            commonInfoDto.setAreacode(dto.getAreacode());
            commonInfoDto.setContentid(dto.getContentid());
            commonInfoDto.setContenttypeid(dto.getContenttypeid());
            commonInfoDto.setTitle(dto.getTitle());
            commonInfoDto.setFirstimage2(dto.getFirstimage2());
            commonInfoDto.setZipcode(dto.getZipcode());
            commonInfoDto.setAddr1(dto.getAddr1());
            commonInfoDto.setOverview(dto.getOverview());

            filterList.add(commonInfoDto);
        }

        return ApiResponseDto.<CommonInfoDto>builder()
                .list(filterList)
                .build();
    }

    /**
     *
     * @param contentId
     * @param contentTypeId
     * @return
     */
    public ApiResponseDto<Map<String, Object>> detailInfo(String contentId, String contentTypeId) {
        String params = "contentId=" + contentId + "&contentTypeId=" + contentTypeId;

        DataDto<Map<String, Object>> response = webClientHelper.fetchDetailInfoData(params);
        BodyDto<Map<String, Object>> body = response.getResponse().getBody();
        List<Map<String, Object>> list = body.getItems().getItem();

        return ApiResponseDto.<Map<String, Object>>builder()
                .list(list)
                .build();
    }

    /**
     * dto 변환
     * @param formattedStarAvg
     * @param placeReview
     * @param cust
     * @param totalCount
     * @param totalPage
     * @return
     */
    private PlaceReviewDto convert(String formattedStarAvg, PlaceReview placeReview, Cust cust, Integer totalCount, Integer totalPage) {

        return PlaceReviewDto.builder()
                .placeReviewNo(placeReview.getPlaceReviewNo())
                .contentid(placeReview.getContentid())
                .star(placeReview.getStar())
                .starAvg(formattedStarAvg)
                .review(placeReview.getReview())
                .reviewImg1(readFileDir + placeReview.getReviewImg1())
                .reviewImg2(readFileDir + placeReview.getReviewImg2())
                .reviewImg3(readFileDir + placeReview.getReviewImg3())
                .reviewImg4(readFileDir + placeReview.getReviewImg4())
                .createDt(placeReview.getCreateDt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                .name(cust.getName())
                .totalCount(totalCount)
                .totalPage(totalPage)
                .build();
    }
}
