package com.pjt.planit.business.cust.controller;



import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mate")
public class CustController {

    //허가
    @GetMapping("/mates")
    public String mates() {
        return "mates";
    }


    //허가안받음
    @GetMapping("/nomate")
    public String noMate() {
        return "nomate";
    }

    //허가안받음
    @GetMapping("/error")
    public String Error() {
        return "errr";
    }

}
