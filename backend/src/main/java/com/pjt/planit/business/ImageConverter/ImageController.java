//package com.pjt.planit.business.ImageConverter;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.client.RestTemplate;
//
//import com.fasterxml.jackson.databind.util.JSONPObject;
//import com.pjt.planit.business.mate.dto.MateWriteDTO;
//import lombok.Data;
//
//@Data
//@RestController
//@RequestMapping("/api/images")
//public class ImageController {
//	
//	 private final String IMGUR_CLIENT_ID = "5043e84fa279a89";
//	 
//	@Autowired
//	private MateWriteDTO dto;
//	
//	@PostMapping("/upload")
//	public void fetchImgUrl() {
//			
//		String rawImg = dto.getThumbnail();
//		
//		HttpHeaders header = new HttpHeaders();
//
//		header.setContentType(MediaType.MULTIPART_FORM_DATA);
//		
//		header.set("Authorization","CLIENT-ID" + IMGUR_CLIENT_ID);
//		
//		JSONPObject body = new JSONPObject("image", rawImg);
//		
//		HttpEntity<String> requestEntity = new HttpEntity<>(body.toString(), header);
//		
//		RestTemplate restTemplate = new RestTemplate();
//		ResponseEntity<String> response = restTemplate.exchange(
//				"https://api.imgur.com/3/image",
//				HttpMethod.POST,
//				requestEntity,
//				String.class
//				);
//		
//		JSONPObject jsonResponse = new JSONPObject("response",response.getBody());
//		
//		String imgUrl = jsonResponse.getValue().toString();
//		
//		System.out.println(imgUrl.toString());
//		
////		dto.setThumbnail(imgUrl);
//	
//	}
//	
//}
