package com.example.property_finder.service;

import com.example.property_finder.dto.ViewingRequestCreateDto;
import com.example.property_finder.dto.ViewingRequestStatusUpdateDto;
import com.example.property_finder.model.Property;
import com.example.property_finder.model.User;
import com.example.property_finder.model.ViewingRequest;
import com.example.property_finder.model.ViewingRequest.ViewingStatus;
import com.example.property_finder.repository.PropertyRepository;
import com.example.property_finder.repository.UserRepository;
import com.example.property_finder.repository.ViewingRequestRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ViewingRequestService {

  @Autowired
  private ViewingRequestRepository viewingRequestRepo;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PropertyRepository propertyRepository;

  public ViewingRequest createRequest(ViewingRequestCreateDto dto) {
    User user = userRepository.findById(dto.getUserId())
        .orElseThrow(() -> new EntityNotFoundException("User not found"));

    Property property = propertyRepository.findById(dto.getPropertyId())
        .orElseThrow(() -> new EntityNotFoundException("Property not found"));

    User agent = property.getOwner(); // agent is the owner of the property

    ViewingRequest request = ViewingRequest.builder()
        .user(user)
        .property(property)
        .agent(agent)
        .requestedDateTime(dto.getRequestedDateTime())
        .message(dto.getMessage())
        .build();

    return viewingRequestRepo.save(request);
  }

  public List<ViewingRequest> getRequestsByAgent(Long agentId) {
    return viewingRequestRepo.findByAgentId(agentId);
  }

  public ViewingRequest updateStatus(Long id, ViewingRequestStatusUpdateDto dto) {
    ViewingRequest request = viewingRequestRepo.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Viewing request not found"));

    request.setStatus(ViewingStatus.valueOf(dto.getStatus().toUpperCase()));
    return viewingRequestRepo.save(request);
  }
}
