package com.moviemate.controller;

import com.moviemate.model.Booking;
import com.moviemate.model.dto.ApiResponse;
import com.moviemate.model.dto.BookingRequest;
import com.moviemate.service.BookingService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    /**
     * POST /api/bookings
     * Confirms and reserves selected seats atomically in MongoDB.
     * Requires the user to be logged in.
     */
    @PostMapping
    public ResponseEntity<ApiResponse<Booking>> createBooking(@Valid @RequestBody BookingRequest request,
                                                             HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession(false);
        if (session == null || session.getAttribute("USER_ID") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Please log in or sign up before completing your ticket booking."));
        }

        Long userId = (Long) session.getAttribute("USER_ID");

        try {
            Booking booking = bookingService.createBooking(request, userId);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.ok("Booking confirmed successfully! Your tickets are reserved.", booking));
        } catch (IllegalStateException e) {
            // Concurrency error: another customer just reserved one of the seats!
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(ApiResponse.error(e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Booking failed: " + e.getMessage()));
        }
    }

    /**
     * GET /api/bookings/my
     * Retrieves all bookings made by the currently authenticated user.
     */
    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<Booking>>> getMyBookings(HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession(false);
        if (session == null || session.getAttribute("USER_ID") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Please log in to view your bookings."));
        }

        Long userId = (Long) session.getAttribute("USER_ID");
        List<Booking> myBookings = bookingService.getUserBookings(userId);
        return ResponseEntity.ok(ApiResponse.ok("User bookings retrieved", myBookings));
    }

    /**
     * GET /api/bookings/{id}
     * Retrieves a single booking ticket, verifying ownership.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Booking>> getBookingById(@PathVariable String id,
                                                               HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession(false);
        if (session == null || session.getAttribute("USER_ID") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Please log in to view this ticket."));
        }

        Long userId = (Long) session.getAttribute("USER_ID");

        try {
            Booking booking = bookingService.getBookingById(id, userId);
            return ResponseEntity.ok(ApiResponse.ok("Ticket details retrieved", booking));
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error(e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}
