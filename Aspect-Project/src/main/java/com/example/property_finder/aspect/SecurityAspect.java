package com.example.property_finder.aspect;

import com.example.property_finder.exception.AccessDeniedException;
import com.example.property_finder.model.Property;
import com.example.property_finder.model.Review;
import com.example.property_finder.model.User;
import com.example.property_finder.service.PropertyService;
import com.example.property_finder.service.ReviewService;
import com.example.property_finder.service.UserService;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Optional;

@Aspect
@Component
public class SecurityAspect {

  private final Logger logger = LoggerFactory.getLogger(SecurityAspect.class);

  @Autowired
  private UserService userService;

  @Autowired
  private PropertyService propertyService;

  @Autowired
  private ReviewService reviewService;

  // Pointcuts
  @Pointcut("execution(* com.example.property_finder.service.PropertyService.update*(..))")
  public void propertyUpdatePointcut() {
  }

  @Pointcut("execution(* com.example.property_finder.service.PropertyService.delete*(..))")
  public void propertyDeletePointcut() {
  }

  @Pointcut("execution(* com.example.property_finder.service.ReviewService.update*(..))")
  public void reviewUpdatePointcut() {
  }

  @Pointcut("execution(* com.example.property_finder.service.ReviewService.delete*(..))")
  public void reviewDeletePointcut() {
  }

  // 🔐 Property Update
  @Before("propertyUpdatePointcut() && args(id,..)")
  public void checkPropertyUpdateAuthorization(JoinPoint joinPoint, Long id) {
    logger.debug("Checking authorization for property update, ID: {}", id);
    User user = getAuthenticatedUser();

    if (user.getRole() == User.UserRole.ADMIN) {
      logger.debug("Admin access granted for property update");
      return;
    }

    Property property = propertyService.getPropertyById(id).orElse(null);
    if (property == null || property.getOwner() == null ||
        !property.getOwner().getId().equals(user.getId())) {
      logger.warn("Access denied: User {} attempted to update property {}", user.getId(), id);
      throw new AccessDeniedException("You can only update your own properties");
    }

    logger.debug("Access granted for property update");
  }

  // 🔐 Property Delete
  @Before("propertyDeletePointcut() && args(id)")
  public void checkPropertyDeleteAuthorization(Long id) {
    logger.debug("Checking authorization for property deletion, ID: {}", id);
    User user = getAuthenticatedUser();

    if (user.getRole() == User.UserRole.ADMIN) {
      logger.debug("Admin access granted for property deletion");
      return;
    }

    Property property = propertyService.getPropertyById(id).orElse(null);
    if (property == null || property.getOwner() == null ||
        !property.getOwner().getId().equals(user.getId())) {
      logger.warn("Access denied: User {} attempted to delete property {}", user.getId(), id);
      throw new AccessDeniedException("You can only delete your own properties");
    }

    logger.debug("Access granted for property deletion");
  }

  // 🔐 Review Update
  @Before("reviewUpdatePointcut() && args(reviewId,..)")
  public void checkReviewUpdateAuthorization(Long reviewId) {
    logger.debug("Checking authorization for review update, ID: {}", reviewId);
    User user = getAuthenticatedUser();

    if (user.getRole() == User.UserRole.ADMIN) {
      logger.debug("Admin access granted for review update");
      return;
    }

    Review review = reviewService.getReviewById(reviewId).orElse(null);
    if (review == null || review.getUser() == null ||
        !review.getUser().getId().equals(user.getId())) {
      logger.warn("Access denied: User {} attempted to update review {}", user.getId(), reviewId);
      throw new AccessDeniedException("You can only update your own reviews");
    }

    logger.debug("Access granted for review update");
  }

  // 🔐 Review Delete
  @Before("reviewDeletePointcut() && args(id)")
  public void checkReviewDeleteAuthorization(Long id) {
    logger.debug("Checking authorization for review deletion, ID: {}", id);
    User user = getAuthenticatedUser();

    if (user.getRole() == User.UserRole.ADMIN) {
      logger.debug("Admin access granted for review deletion");
      return;
    }

    Review review = reviewService.getReviewById(id).orElse(null);
    if (review == null) {
      throw new AccessDeniedException("Review not found");
    }

    if (review.getUser() != null && review.getUser().getId().equals(user.getId())) {
      logger.debug("Author access granted for review deletion");
      return;
    }

    if (review.getProperty() != null && review.getProperty().getOwner() != null &&
        review.getProperty().getOwner().getId().equals(user.getId())) {
      logger.debug("Property owner access granted for review deletion");
      return;
    }

    logger.warn("Access denied: User {} attempted to delete review {}", user.getId(), id);
    throw new AccessDeniedException("You can only delete your own reviews or reviews on your properties");
  }

  // ✅ Helper to get Firebase-authenticated user from request
  private User getAuthenticatedUser() {
    ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
    if (attrs == null) {
      throw new AccessDeniedException("Unable to access request");
    }

    String email = (String) attrs.getRequest().getAttribute("firebaseEmail");
    if (email == null) {
      throw new AccessDeniedException("User not authenticated");
    }

    Optional<User> userOptional = userService.getUserByEmail(email);
    if (userOptional.isEmpty()) {
      throw new AccessDeniedException("User not found in system");
    }

    return userOptional.get();
  }
}
