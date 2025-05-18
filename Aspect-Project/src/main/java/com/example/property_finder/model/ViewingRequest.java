package com.example.property_finder.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ViewingRequest {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "agent_id", nullable = false)
  private User agent;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "property_id", nullable = false)
  private Property property;

  private LocalDateTime requestedDateTime;

  private String message;

  @Enumerated(EnumType.STRING)
  private ViewingStatus status;

  private LocalDateTime createdAt;

  @PrePersist
  public void prePersist() {
    this.createdAt = LocalDateTime.now();
    if (this.status == null) {
      this.status = ViewingStatus.PENDING;
    }
  }

  public enum ViewingStatus {
    PENDING,
    APPROVED,
    DECLINED
  }
}
