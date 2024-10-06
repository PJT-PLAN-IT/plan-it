package com.pjt.planit.business.cust.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginDto {

    @NotNull
    private String email;

    @NotNull
    private String password;
}
