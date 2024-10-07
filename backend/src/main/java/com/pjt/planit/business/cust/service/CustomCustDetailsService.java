package com.pjt.planit.business.cust.service;

import com.pjt.planit.business.cust.dto.CustomCustDetails;
import com.pjt.planit.db.entity.Cust;
import com.pjt.planit.db.repository.CustRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * UserDetailService Custom Service
 * with Spring Security Core
 */
@Service
public class CustomCustDetailsService implements UserDetailsService{

    private final CustRepository custRepository;

    public CustomCustDetailsService(CustRepository custRepository) {
        this.custRepository = custRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<Cust> cust = custRepository.findByEmail(email);

        if(cust.isPresent()) {
            return new CustomCustDetails(cust.get());
        }

        return null;
    }
}

