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

    /**
     * 사용자에게 부여된 권한을 GrantedAuthority 객체의 컬렉션으로 반환
     *
     * @return Collection<GrantedAuthority>
     */
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

    /**
     * 사용자의 암호화된 비밀번호를 반환
     *
     * @return String
     */
    @Override
    public String getPassword() {
        return cust.getPw();
    }

    /**
     * 사용자의 이름을 반환 => 이 프로젝트에서는 이메일
     *
     * @return String
     */
    @Override
    public String getUsername() {
        return cust.getEmail();
    }

    /**
     * 사용자 계정이 만료되지 않았는지 여부를 반환 (default: true)
     *
     * @return boolean
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * 사용자 계정이 잠기지 않았는지 여부를 반환 (default: true)
     *
     * @return boolean
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * 사용자의 비밀번호가 만료되지 않았는지 여부를 반환 (default: true)
     *
     * @return boolean
     */

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * 사용자 계정이 활성화 되었는지 여부를 반환 (default: true)
     *
     * @return boolean
     */
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

    public String getEmail(){
        return cust.getEmail();
    }

}
