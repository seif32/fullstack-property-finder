package com.example.property_finder.dto;

import lombok.Data;

@Data
public class ViewingRequestStatusUpdateDto {
  private String status; // "APPROVED", "DECLINED", etc.
}
