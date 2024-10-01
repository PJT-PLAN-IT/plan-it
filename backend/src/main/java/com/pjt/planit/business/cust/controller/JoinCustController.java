package com.pjt.planit.business.cust.controller;

import com.pjt.planit.business.cust.dto.CustJoinDto;
import com.pjt.planit.business.cust.service.JoinCustService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class JoinCustController {

    private final JoinCustService joinCustService;

    public JoinCustController(JoinCustService joinCustService) {

        this.joinCustService = joinCustService;
    }

    @PostMapping("/join")
    public String joinProcess(@Valid @RequestBody CustJoinDto custJoinDto){
        joinCustService.JoinProcess(custJoinDto);
        return "ok";
    }

}
