package com.example.property_finder.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

  @PostConstruct
  public void initFirebase() {
    try {
      InputStream serviceAccount = getClass()
          .getClassLoader()
          .getResourceAsStream("firebase/serviceAccountKey.json");

      FirebaseOptions options = FirebaseOptions.builder()
          .setCredentials(GoogleCredentials.fromStream(serviceAccount))
          .build();

      if (FirebaseApp.getApps().isEmpty()) {
        FirebaseApp.initializeApp(options);
      }
    } catch (Exception e) {
      throw new RuntimeException("Failed to initialize Firebase", e);
    }
  }
}
