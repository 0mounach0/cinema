package com.mounach.cinema;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.BufferedImageHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;

import java.awt.image.BufferedImage;

@EnableDiscoveryClient
@SpringBootApplication
public class CinemaApplication {

	public static void main(String[] args) {
		SpringApplication.run(CinemaApplication.class, args);
	}

	@Bean
	public HttpMessageConverter<BufferedImage> createImageHttpMessageConverter() {
		return new BufferedImageHttpMessageConverter();
	}

}
