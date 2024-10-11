package com.pjt.planit.business.mypage.service;

import com.pjt.planit.db.entity.PlaceReview;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class UploadService {

    @Value("${file.fileDir}")
    private String fileDir;

    public PlaceReview savePhotos(PlaceReview placeReview, List<MultipartFile> photos) {
        if (photos == null || photos.size() == 0) {
            return placeReview;
        }

        String[] reviewImgs = new String[4];

        for (int i = 0; i < 4; i++) {
            if (photos.size() > i && photos.get(i) != null && !photos.get(i).isEmpty()) {
                reviewImgs[i] = saveFile(photos.get(i));
            } else {
                reviewImgs[i] = null;
            }
        }

        String reviewImg1 = reviewImgs[0];
        String reviewImg2 = reviewImgs[1];
        String reviewImg3 = reviewImgs[2];
        String reviewImg4 = reviewImgs[3];

        placeReview.review(reviewImg1, reviewImg2, reviewImg3, reviewImg4);

        return placeReview;
    }

    /**
     * 외부경로에 파일 저장
     * @param multipartFile
     * @return
     */
    private String saveFile(MultipartFile multipartFile){
        String originalFilename = multipartFile.getOriginalFilename();
        String storeFileName = createStoreFileName(originalFilename);
        if (!multipartFile.isEmpty()){
            String filePath = fileDir + storeFileName;
            try {
                multipartFile.transferTo(new File(filePath));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return storeFileName;
    }

    /**
     * 서버에 저장하는 파일명
     * @param originalFilename
     * @return
     */
    private String createStoreFileName(String originalFilename) {
        String ext = extracted(originalFilename);
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    /**
     * 확장자 찾기
     * @param originalFilename
     * @return
     */
    private String extracted(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }
}
