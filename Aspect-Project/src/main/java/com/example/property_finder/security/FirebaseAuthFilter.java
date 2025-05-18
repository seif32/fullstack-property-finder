package com.example.property_finder.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class FirebaseAuthFilter implements Filter {

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {

    HttpServletRequest httpReq = (HttpServletRequest) request;
    HttpServletResponse httpRes = (HttpServletResponse) response;

    String path = httpReq.getRequestURI();
    String method = httpReq.getMethod();

    System.out.println("[FirebaseAuthFilter] Incoming request: " + method + " " + path);

    // ✅ Define which routes require authentication
    boolean isProtected = (path.startsWith("/api/properties") && !method.equals("GET")) ||
        (path.startsWith("/api/reviews") && !method.equals("GET")) ||
        path.equals("/api/users/me");

    if (!isProtected) {
      // ✅ Allow unprotected routes to proceed
      chain.doFilter(request, response);
      return;
    }

    // ✅ Extract the Authorization header
    String authHeader = httpReq.getHeader("Authorization");

    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      String idToken = authHeader.substring(7);
      try {
        // ✅ Verify Firebase token
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
        String email = decodedToken.getEmail();

        if (email == null || email.isEmpty()) {
          System.out.println("[FirebaseAuthFilter] Token verified but email is missing");
          httpRes.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Firebase token (no email)");
          return;
        }

        // ✅ Attach user email to the request for later use (e.g., in SecurityAspect)
        httpReq.setAttribute("firebaseEmail", email);

        System.out.println("[FirebaseAuthFilter] Token verified. Email: " + email);

        chain.doFilter(request, response);
      } catch (Exception e) {
        System.out.println("[FirebaseAuthFilter] Token verification failed: " + e.getMessage());
        httpRes.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Firebase token");
      }
    } else {
      System.out.println("[FirebaseAuthFilter] Missing or malformed Authorization header");
      httpRes.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization header missing or invalid");
    }
  }
}
