package com.pjt.planit.business.cust.service;

import com.pjt.planit.business.cust.dto.CustJoinDto;
import com.pjt.planit.db.entity.Cust;
import com.pjt.planit.db.repository.CustRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class JoinCustService {

    private final CustRepository custRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public JoinCustService(CustRepository custRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {

        this.custRepository = custRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    // return값 변경하기 true/false
    /**
     * 회원가입
     * @param custJoinDto
     */
    public void signup(CustJoinDto custJoinDto) {
        boolean existsByEmail = custRepository.existsByEmail(custJoinDto.getEmail());
        boolean existsByNickname = custRepository.existsByNickname(custJoinDto.getNickname());

        if(existsByEmail || existsByNickname) {
            return;
        }
        Cust cust = Cust.builder()
                .email(custJoinDto.getEmail())
                .pw(bCryptPasswordEncoder.encode(custJoinDto.getPw()))
                .name(custJoinDto.getName())
                .nickname(custJoinDto.getNickname())
                .phoneNumber(custJoinDto.getPhoneNumber())
                .birthDt(custJoinDto.getBirthDt())
                .gender(custJoinDto.getGender())
                .joinDt(LocalDateTime.now())
                .build();
        System.out.println(cust.getEmail());
        cust.setCreateBy(cust.getEmail());

        custRepository.save(cust);

    }

    /**
     * 이메일 중복확인
     * @param email
     * @return
     */
    public Boolean emailCheck(String email) {
        return custRepository.existsByEmail(email);
    }

    /**
     * 닉네임 중복확인
     * @param nickname
     * @return
     */
    public Boolean nickNameCheck(String nickname) {
        return custRepository.existsByNickname(nickname);
    }

}
