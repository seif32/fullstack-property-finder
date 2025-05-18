package com.example.property_finder.controller;

import com.example.property_finder.dto.UserDTO;
import com.example.property_finder.model.User;
import com.example.property_finder.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping
  public ResponseEntity<List<UserDTO>> getAllUsers() {
    List<User> users = userService.getAllUsers();
    List<UserDTO> userDTOs = new ArrayList<>();

    for (User user : users) {
      userDTOs.add(convertToDTO(user));
    }

    return ResponseEntity.ok(userDTOs);
  }

  @GetMapping("/{id}")
  public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
    Optional<User> userOptional = userService.getUserById(id);

    if (userOptional.isPresent()) {
      UserDTO userDTO = convertToDTO(userOptional.get());
      return ResponseEntity.ok(userDTO);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping
  public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
    System.out.println("[UserController] Received request to create user with email: " + userDTO.getEmail());

    try {
      // Check if user already exists
      boolean exists = userService.existsByEmail(userDTO.getEmail());
      System.out.println("[UserController] User exists? " + exists);

      if (exists) {
        System.out.println("[UserController] Email already exists. Returning 409 Conflict.");
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
      }

      // Convert DTO to entity
      User user = convertToEntity(userDTO);
      System.out.println("[UserController] Converted to entity: " + user);

      // Save user
      User savedUser = userService.saveUser(user);
      System.out.println("[UserController] User saved: " + savedUser.getEmail() + " (ID: " + savedUser.getId() + ")");

      // Convert to DTO and return
      UserDTO responseDTO = convertToDTO(savedUser);
      System.out.println("[UserController] Returning created user DTO");

      return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);

    } catch (Exception e) {
      System.out.println("[UserController] Error during user creation: " + e.getMessage());
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
    Optional<User> existingUserOptional = userService.getUserById(id);

    if (existingUserOptional.isPresent()) {
      User userToUpdate = convertToEntity(userDTO);
      userToUpdate.setId(id);

      User updatedUser = userService.saveUser(userToUpdate);
      return ResponseEntity.ok(convertToDTO(updatedUser));
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    if (userService.getUserById(id).isPresent()) {
      userService.deleteUser(id);
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping("/me")
  public ResponseEntity<UserDTO> getCurrentUser(HttpServletRequest request) {
    System.out.println("[UserController] /me endpoint hit");

    String email = (String) request.getAttribute("firebaseEmail");
    System.out.println("[UserController] Extracted firebaseEmail from request: " + email);

    if (email == null) {
      System.out.println("[UserController] No email found in request attributes. Returning 401.");
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    Optional<User> userOptional = userService.getUserByEmail(email);
    if (userOptional.isEmpty()) {
      System.out.println("[UserController] No user found in DB for email: " + email);
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    User user = userOptional.get();
    System.out.println("[UserController] User found: " + user.getEmail());
    return ResponseEntity.ok(convertToDTO(user));
  }

  @PutMapping("/{id}/role")
  public ResponseEntity<UserDTO> updateUserRole(
      @PathVariable Long id,
      @RequestParam("role") String role) {
    Optional<User> userOptional = userService.getUserById(id);

    if (userOptional.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    User user = userOptional.get();

    try {
      user.setRole(User.UserRole.valueOf(role.toUpperCase())); // e.g. "AGENT"
      User updatedUser = userService.saveUser(user);
      return ResponseEntity.ok(convertToDTO(updatedUser));
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().build(); // if role is invalid
    }
  }

  // Helper methods for DTO conversion
  private UserDTO convertToDTO(User user) {
    UserDTO dto = new UserDTO();
    dto.setId(user.getId());
    dto.setEmail(user.getEmail());
    dto.setFirstName(user.getFirstName());
    dto.setLastName(user.getLastName());
    dto.setPhoneNumber(user.getPhoneNumber());
    dto.setRole(user.getRole());
    // We don't set password in the returned DTO for security reasons
    return dto;
  }

  private User convertToEntity(UserDTO dto) {
    User user = new User();
    if (dto.getId() != null) {
      user.setId(dto.getId());
    }
    user.setEmail(dto.getEmail());
    user.setFirstName(dto.getFirstName());
    user.setLastName(dto.getLastName());
    user.setPhoneNumber(dto.getPhoneNumber());

    // Set role, default to USER if null
    if (dto.getRole() != null) {
      user.setRole(dto.getRole());
    } else {
      user.setRole(User.UserRole.USER);
    }

    // Only set password if it's provided
    if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
      // In a real application, you would hash the password here
      user.setPassword(dto.getPassword());
    }

    return user;
  }
}
