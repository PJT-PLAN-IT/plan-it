package com.pjt.planit.core.util;

import com.pjt.planit.db.entity.Cust;
import com.pjt.planit.db.repository.CustRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * 로그인된 사용자 정보 확인
 */
@Service
public class FindAuthorizedUser {

    private CustRepository custRepository;

    public FindAuthorizedUser(CustRepository custRepository) {
        this.custRepository = custRepository;
    }

    public Optional<Cust> findUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Optional<Cust> cust = custRepository.findByEmail(email);
        if(cust.isPresent()) {
            return cust;
        }

        return Optional.empty();

    }
}
