package com.pjt.planit.business.mate.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.pjt.planit.db.entity.TripDetail;
import com.pjt.planit.db.entity.TripPlan;
import com.pjt.planit.db.repository.TripDetailRepository;
import com.pjt.planit.db.repository.TripPlanRepository;

@Service
public class MateFetchTripService {
	
	private final TripPlanRepository planRepository;
	private final TripDetailRepository detailRepository;
	
	public MateFetchTripService (TripPlanRepository planRepository,TripDetailRepository detailRepository) {
		this.planRepository = planRepository;
		this.detailRepository = detailRepository;
	} 


	public List<TripPlan> getTripPlansByCustNo(int custNo) {
	return planRepository.findAllByCustNo(custNo);
	}


	public List<TripDetail> getTripDetailByTripPlanNo(int tripPlanNo) {
		return detailRepository.getTripDetailByTripPlanNo(tripPlanNo);
	}

}
