package com.example.property_finder.repository;

import com.example.property_finder.model.ViewingRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ViewingRequestRepository extends JpaRepository<ViewingRequest, Long> {
  List<ViewingRequest> findByAgentId(Long agentId);
}
