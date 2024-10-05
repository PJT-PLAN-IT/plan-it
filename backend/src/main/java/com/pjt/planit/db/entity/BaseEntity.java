package com.pjt.planit.db.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.pjt.planit.business.cust.dto.CustomCustDetails;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Optional;

@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
@Data
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class BaseEntity {


    @Column(name = "create_dt")
    private LocalDateTime createDt;

    @CreatedBy
    @Column(name = "create_by")
    private String createBy;

    @Column(name = "update_dt")
    private LocalDateTime updateDt;

    @LastModifiedBy
    @Column(name = "update_by")
    private String updateBy;

    @PrePersist
    public void prePersist() {
        this.createDt = LocalDateTime.now();
        this.createBy = getAuthInfo();
    }

    @PreUpdate
    public void preUpdate() {
        this.updateDt = LocalDateTime.now();
        this.updateBy = getAuthInfo();
    }

    private String getAuthInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && !"anonymousUser".equals(authentication.getName())) {
            return ((CustomCustDetails) authentication.getPrincipal()).getEmail();
        }
        return null;
    }
}
