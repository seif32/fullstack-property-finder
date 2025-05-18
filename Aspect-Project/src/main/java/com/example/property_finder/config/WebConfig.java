package com.example.property_finder.config;

import jakarta.servlet.Filter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.property_finder.security.FirebaseAuthFilter;

@Configuration
public class WebConfig {

  @Bean
  public FilterRegistrationBean<Filter> firebaseFilter(FirebaseAuthFilter filter) {
    FilterRegistrationBean<Filter> registration = new FilterRegistrationBean<>();
    registration.setFilter(filter);
    registration.addUrlPatterns("/api/*"); // or more specific
    registration.setOrder(1); // priority
    return registration;
  }
}
