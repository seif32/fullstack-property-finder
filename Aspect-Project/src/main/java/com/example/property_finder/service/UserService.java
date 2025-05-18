package com.example.property_finder.service;

import com.example.property_finder.model.User;
import com.example.property_finder.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  public Optional<User> getUserById(Long id) {
    return userRepository.findById(id);
  }

  public Optional<User> getUserByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  @Transactional
  public User saveUser(User user) {
    // Hash the password if it's not already hashed
    // Only hash password if provided — for Firebase users, password may be null
    if (user.getPassword() != null && !user.getPassword().trim().isEmpty()) {
      user.setPassword(passwordEncoder.encode(user.getPassword()));
    } else {
      // Set placeholder to avoid DB error (if schema still requires non-null)
      user.setPassword("FIREBASE_AUTH");
    }

    return userRepository.save(user);
  }

  @Transactional
  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }

  public boolean existsByEmail(String email) {
    return userRepository.existsByEmail(email);
  }
}
