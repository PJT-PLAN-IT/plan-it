package com.pjt.planit.mypage.service;

import com.pjt.planit.entity.TripPlan;
import com.pjt.planit.mypage.dto.MyMateListDto;
import com.pjt.planit.mypage.repository.MyMateListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class MyMateListService {

    private final MyMateListRepository myMateListRepository;

    public List<MyMateListDto> findList(int custNo) {
        List<TripPlan> list = myMateListRepository.findAllByCustNoOrderByCreateDtDesc(custNo);
        List<MyMateListDto> result = list.stream()
                .map(e -> new MyMateListDto().toDto(e))
                .collect(Collectors.toList());
        return result;

//        List<MyMateListDto> result = new ArrayList<>();
//        for (TripPlan tripPlan : list){
//            MyMateListDto dto = new MyMateListDto();
//            dto.toDto(tripPlan);
//            result.add(dto);
//        }
//        return result;

    }

//    private MyMateListDto convert(TripPlan entity) {
//        return MyMateListDto.builder()
//                .tripPlanNo(entity.getTripPlanNo())
//                .custNo(entity.getCustNo())
//                .title(entity.getTitle())
//                .startDt(entity.getStartDt())
//                .endDt(entity.getEndDt())
//                .thumbnailImg(entity.getThumbnailImg())
//                .review(entity.getReview())
//                .publicYn(entity.getPublicYn())
//                .createYmd(entity.getCreateDt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")))
//                .build();
//    }

}