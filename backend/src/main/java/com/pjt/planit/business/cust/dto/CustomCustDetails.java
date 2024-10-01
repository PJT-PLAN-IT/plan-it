package com.pjt.planit.business.cust.dto;


import com.pjt.planit.db.entity.Cust;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class CustomCustDetails implements UserDetails{

    private final Cust cust;

    public CustomCustDetails(Cust cust) {
        this.cust = cust;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {

            @Override
            public String getAuthority() {

                return "Customer";
            }
        });

        return collection;
    }

    @Override
    public String getPassword() {
        return cust.getPw();
    }

    @Override
    public String getUsername() {
        return cust.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public int getCustNo(){
        return cust.getCustNo();
    }

    public String getNickname(){
        return cust.getNickname();
    }


}
