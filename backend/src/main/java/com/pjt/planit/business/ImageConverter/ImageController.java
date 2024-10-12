package com.pjt.planit.business.ImageConverter;

import java.io.IOException;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.util.JSONPObject;
import lombok.Data;

@Data
@RestController
@RequestMapping("/api/images")
public class ImageController {

	private final String IMGUR_CLIENT_ID = "7e0b9a234f05ac8";

	@PostMapping("/upload")
	public void fetchImgUrl(@RequestParam("image") MultipartFile image) throws IOException {

		byte[] imageBytes = image.getBytes();

		String base64Image = java.util.Base64.getEncoder().encodeToString(imageBytes);

		HttpHeaders header = new HttpHeaders();

		header.setContentType(MediaType.MULTIPART_FORM_DATA);

		header.set("Authorization", "CLIENT-ID" + IMGUR_CLIENT_ID);

		JSONPObject body = new JSONPObject("image", base64Image);

		HttpEntity<String> requestEntity = new HttpEntity<>(body.toString(), header);

		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.exchange("https://api.imgur.com/3/image", HttpMethod.POST,
				requestEntity, String.class);

		JSONPObject jsonResponse = new JSONPObject("response", response.getBody());

		String imgUrl = jsonResponse.getValue().toString();

		System.out.println(imgUrl.toString());

//		dto.setThumbnail(imgUrl);

	}

}
