
package com.moviemate.controller;

import com.moviemate.model.dto.ApiResponse;
import com.moviemate.model.dto.LoginRequest;
import com.moviemate.model.dto.SignupRequest;
import com.moviemate.model.dto.UserDto;
import com.moviemate.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger =
            LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // POST /api/auth/signup
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<UserDto>> signup(
            @Valid @RequestBody SignupRequest request,
            HttpServletRequest httpRequest) {

        try {

            UserDto newUser = authService.register(request);

            // Create session after successful registration
            HttpSession session = httpRequest.getSession(true);

            // Prevent session fixation
            httpRequest.changeSessionId();

            session.setMaxInactiveInterval(30 * 60);

            session.setAttribute("USER_ID", newUser.getId());
            session.setAttribute("USER_EMAIL", newUser.getEmail());

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.ok(
                            "Registration successful! Welcome to MovieMate.",
                            newUser
                    ));

        } catch (IllegalArgumentException e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));

        } catch (Exception e) {

            logger.error("Registration failed", e);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(
                            "Registration failed. Please try again."
                    ));
        }
    }

    // POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserDto>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest) {

        try {

            UserDto user = authService.login(request);

            // Create or retrieve session
            HttpSession session = httpRequest.getSession(true);

            // Rotate session ID after authentication
            httpRequest.changeSessionId();

            session.setMaxInactiveInterval(30 * 60);

            session.setAttribute("USER_ID", user.getId());
            session.setAttribute("USER_EMAIL", user.getEmail());

            return ResponseEntity.ok(
                    ApiResponse.ok(
                            "Login successful. Welcome back!",
                            user
                    )
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(e.getMessage()));

        } catch (Exception e) {

            logger.error("Login failed", e);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(
                            "Login failed. Please try again."
                    ));
        }
    }

    // POST /api/auth/logout
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            HttpServletRequest httpRequest) {

        HttpSession session = httpRequest.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok(
                ApiResponse.ok("Logged out successfully.")
        );
    }

    // GET /api/auth/me
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> getCurrentUser(
            HttpServletRequest httpRequest) {

        HttpSession session = httpRequest.getSession(false);

        if (session == null ||
                session.getAttribute("USER_ID") == null) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(
                            "Not authenticated. Please log in."
                    ));
        }

        Long userId = (Long) session.getAttribute("USER_ID");

        try {

            UserDto user = authService.getUserById(userId);

            return ResponseEntity.ok(
                    ApiResponse.ok("Authenticated user profile", user)
            );

        } catch (Exception e) {

            logger.error("Unable to retrieve authenticated user", e);

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("User session invalid"));
        }
    }
}
