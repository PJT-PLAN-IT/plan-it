package com.pjt.planit.testcontroller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/server")
public class TestController {

    @GetMapping("/test")
    public String test(){
        System.out.println("test");
        return "test 확인 후 삭제";
    }
}
