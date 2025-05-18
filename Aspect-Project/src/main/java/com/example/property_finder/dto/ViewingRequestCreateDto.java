package com.example.property_finder.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ViewingRequestCreateDto {
  private Long userId;
  private Long propertyId;
  private LocalDateTime requestedDateTime;
  private String message;
}
