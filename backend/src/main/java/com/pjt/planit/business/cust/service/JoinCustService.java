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
    public Boolean JoinProcess(CustJoinDto custJoinDto) {
        Boolean isExist = custRepository.existsByEmail(custJoinDto.getEmail());

        if(isExist) {
            return false;
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
        cust.setCreateBy(cust.getName());
        cust.setCreateDt(LocalDateTime.now());

        custRepository.save(cust);

        return true;
    }


}
