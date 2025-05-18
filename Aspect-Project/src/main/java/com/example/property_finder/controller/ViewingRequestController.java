package com.example.property_finder.controller;

import com.example.property_finder.dto.ViewingRequestCreateDto;
import com.example.property_finder.dto.ViewingRequestDto;
import com.example.property_finder.dto.ViewingRequestStatusUpdateDto;
import com.example.property_finder.model.ViewingRequest;
import com.example.property_finder.service.ViewingRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/viewing-requests")
public class ViewingRequestController {

  @Autowired
  private ViewingRequestService service;

  @PostMapping
  public ViewingRequestDto create(@RequestBody ViewingRequestCreateDto dto) {
    ViewingRequest entity = service.createRequest(dto);

    return new ViewingRequestDto(
        entity.getId(),
        entity.getProperty().getId(),
        entity.getUser().getId(),
        entity.getAgent().getId(),
        entity.getRequestedDateTime(),
        entity.getMessage(),
        entity.getStatus().name(),
        entity.getCreatedAt());
  }

  @GetMapping("/agent/{agentId}")
  public List<ViewingRequestDto> getForAgent(@PathVariable Long agentId) {
    return service.getRequestsByAgent(agentId).stream()
        .map(viewing -> new ViewingRequestDto(
            viewing.getId(),
            viewing.getProperty().getId(), // fixed
            viewing.getUser().getId(), // fixed
            viewing.getAgent().getId(),
            viewing.getRequestedDateTime(),
            viewing.getMessage(),
            viewing.getStatus().name(),
            viewing.getCreatedAt()))
        .toList();
  }

  @PatchMapping("/{id}")
  public ViewingRequest updateStatus(@PathVariable Long id,
      @RequestBody ViewingRequestStatusUpdateDto dto) {
    return service.updateStatus(id, dto);
  }
}
