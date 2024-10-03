package com.pjt.planit.business.mypage.service;

import com.pjt.planit.business.mypage.dto.CustInfoDto;
import com.pjt.planit.db.entity.Cust;
import com.pjt.planit.db.repository.CustRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserInfoService {

    private final CustRepository custRepository;

    /**
     * 개인정보 불러오기
     * @param custNo
     * @return
     */
    public CustInfoDto userInfo(Integer custNo) {
        Optional<Cust> byId = custRepository.findById(custNo);
        if (byId.isPresent()) {
            Cust cust = byId.get();
            CustInfoDto list = toDto(cust);
            return list;
        }
        throw new IllegalStateException("존재하는 회원이 없습니다.");
    }

    /**
     * 개인정보 수정
     * @param dto
     * @return
     */
    @Transactional
    public void updateUserInfo(CustInfoDto dto) {
        Optional<Cust> byId = custRepository.findById(dto.getCustNo());
        if (byId.isPresent()) {
            Cust cust = byId.get();

            LocalDateTime birthDateTime = LocalDateTime.of(
                    Integer.parseInt(dto.getBirthYear()),
                    Integer.parseInt(dto.getBirthMonth()),
                    Integer.parseInt(dto.getBirthDay()),
                    0,0,0
            );
            cust.updateUserInfo(dto.getCustNo(), dto.getEmail(), dto.getPw(), dto.getName(), dto.getNickname(),
                    dto.getPhoneNumber(), birthDateTime, dto.getGender());

            custRepository.save(cust);
        }
    }

    /**
     * 닉네임 중복확인
     * @param nickName
     * @return
     */
    public Boolean nickNameCheck(String nickName) {
        return custRepository.existsByNickname(nickName);
    }


    /**
     * dto 변환
     * @param cust
     * @return
     */
    private CustInfoDto toDto(Cust cust) {
        return CustInfoDto.builder()
                .custNo(cust.getCustNo())
                .email(cust.getEmail())
                .pw(cust.getPw())
                .name(cust.getName())
                .nickname(cust.getNickname())
                .phoneNumber(cust.getPhoneNumber())
                .birthYear(String.valueOf(cust.getBirthDt().getYear()))
                .birthMonth(String.valueOf(cust.getBirthDt().getMonthValue()))
                .birthDay(String.valueOf(cust.getBirthDt().getDayOfMonth()))
                .gender(cust.getGender())
                .build();
    }
}
