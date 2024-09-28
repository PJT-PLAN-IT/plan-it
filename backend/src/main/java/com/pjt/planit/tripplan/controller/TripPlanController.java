package com.pjt.planit.tripplan.controller;

import com.pjt.planit.tripplan.dto.PlanDto;
import com.pjt.planit.tripplan.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/plan")
@RestController
public class TripPlanController {
    @Autowired
    PlanService planService;

    @GetMapping("/list")
    public List<PlanDto> getPlanListById(@RequestParam("custNo") Integer custNo, @RequestParam("year") Integer year) {
        return planService.getPlanList(custNo, year);
    }
}
