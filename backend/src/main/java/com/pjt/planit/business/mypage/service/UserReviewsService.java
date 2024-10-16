package com.pjt.planit.business.mypage.service;

import com.pjt.planit.business.mypage.dto.ReviewListDto;
import com.pjt.planit.business.mypage.dto.ReviewRetrieveDto;
import com.pjt.planit.business.placeInfo.controller.PlaceInfoController;
import com.pjt.planit.business.placeInfo.dto.ApiResponseDto;
import com.pjt.planit.business.placeInfo.dto.CommonInfoDto;
import com.pjt.planit.business.placeInfo.service.PlaceDetailService;
import com.pjt.planit.business.placeInfo.service.PlaceInfoService;
import com.pjt.planit.business.tripplan.dto.PlaceReviewDto;
import com.pjt.planit.db.entity.PlaceReview;
import com.pjt.planit.db.repository.PlaceReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserReviewsService {

    private final PlaceReviewRepository placeReviewRepository;
    private final UploadService uploadService;
    private final PlaceDetailService placeDetailService;

    @Value("${file.fileDir}")
    private String fileDir;
    @Value("${file.readFileDir}")
    private String readFileDir;

    /**
     * 내가 작성한 리뷰 조회
     * @param custNo
     * @param page
     * @param size
     * @return
     */
    public List<ReviewListDto> reviewList(Integer custNo, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createDt").descending());  // createDt를 기준으로 내림차순 정렬
        Page<PlaceReview> placeReview = placeReviewRepository.findAllByCustNo(custNo, pageable);  //내가 작성한 게시물 찾기

        Integer totalCount = (int) placeReview.getTotalElements();
        Integer totalPage = placeReview.getTotalPages();

        List<ReviewListDto> result = placeReview.stream()
                .map(entitiy -> {
                    ReviewListDto convert = convert(entitiy, totalCount, totalPage, fileDir);
                    return convert;
                })
                .toList();

        return result;
    }

    /**
     * 리뷰 삭제
     * @param placeReviewNo
     */
    @Transactional
    public void reviewDelete(Integer placeReviewNo) {
        placeReviewRepository.deleteByPlaceReviewNo(placeReviewNo);
    }

    /**
     * 리뷰 수정
     * @param placeReviewDto
     */
    @Transactional
    public void updatePlaceReveiw(List<MultipartFile> photos, PlaceReviewDto placeReviewDto) {
        Optional<PlaceReview> getPlaceReview =  placeReviewRepository.findByPlaceReviewNoAndCustNo(placeReviewDto.getPlaceReviewNo(), placeReviewDto.getCustNo());
        if(getPlaceReview.isPresent()) {
            PlaceReview placeReview = getPlaceReview.get();
            placeReview.setContentid(placeReviewDto.getContentid());
            placeReview.setStar(placeReviewDto.getStar());
            placeReview.setReview(placeReviewDto.getReview());
            uploadService.savePhotos(placeReview, photos);
            placeReviewRepository.save(placeReview);
        }
    }

    /**
     * 수정버튼 누를시 등록한 리뷰정보 조회
     * @param placeReviewNo
     * @return
     */
    public ReviewRetrieveDto reviewDetail(Integer placeReviewNo) {
        PlaceReview review = placeReviewRepository.findByPlaceReviewNo(placeReviewNo);
        ReviewRetrieveDto result = ReviewRetrieveDto.builder()
                .placeReviewNo(review.getPlaceReviewNo())
                .contentid(review.getContentid())
                .star(review.getStar())
                .review(review.getReview())
                .reviewImg1(review.getReviewImg1())
                .reviewImg2(review.getReviewImg2())
                .reviewImg3(review.getReviewImg3())
                .reviewImg4(review.getReviewImg4())
                .build();
        return result;
    }

    /**
     * dto 변환
     * @param placeReview
     * @param totalCount
     * @param totalPage
     * @return
     */
    private ReviewListDto convert(PlaceReview placeReview, Integer totalCount, Integer totalPage, String fileDir) {

        ApiResponseDto<CommonInfoDto> commonInfo = placeDetailService.commonInfo(placeReview.getContentid(), "Y", "Y", "Y", "Y", "Y");
        List<CommonInfoDto> dto = commonInfo.getList();
        String title = dto.stream()
                .map(o -> o.getTitle())
                .findAny()
                .get();

        ReviewListDto.ReviewListDtoBuilder list = ReviewListDto.builder()
                .placeReviewNo(placeReview.getPlaceReviewNo())
                .contentid(placeReview.getContentid())
                .star(placeReview.getStar())
                .review(placeReview.getReview())
                .createDt(placeReview.getCreateDt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                .totalCount(totalCount)
                .totalPage(totalPage)
                .title(title);
        if (placeReview.getReviewImg1() != null) {
            list.reviewImg1(readFileDir + placeReview.getReviewImg1());
        }
        if (placeReview.getReviewImg2() != null) {
            list.reviewImg2(readFileDir + placeReview.getReviewImg2());
        }
        if (placeReview.getReviewImg3() != null) {
            list.reviewImg3(readFileDir + placeReview.getReviewImg3());
        }
        if (placeReview.getReviewImg4() != null) {
            list.reviewImg4(readFileDir + placeReview.getReviewImg4());
        }
        return list.build();
    }
}
