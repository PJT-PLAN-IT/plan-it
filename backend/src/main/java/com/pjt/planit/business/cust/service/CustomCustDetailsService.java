package com.pjt.planit.business.cust.service;

import com.pjt.planit.business.cust.dto.CustomCustDetails;
import com.pjt.planit.db.entity.Cust;
import com.pjt.planit.db.repository.CustRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomCustDetailsService implements UserDetailsService{

    private final CustRepository custRepository;

    public CustomCustDetailsService(CustRepository custRepository) {
        this.custRepository = custRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Cust cust = custRepository.findAllByEmail(email);

        if(cust != null) {
            return new CustomCustDetails(cust);
        }

        return null;
    }
}

