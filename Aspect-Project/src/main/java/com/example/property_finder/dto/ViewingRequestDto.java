package com.example.property_finder.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ViewingRequestDto {
  private Long id;
  private Long propertyId;
  private Long userId;
  private Long agentId;
  private LocalDateTime requestedDateTime;
  private String message;
  private String status;
  private LocalDateTime createdAt;
}
