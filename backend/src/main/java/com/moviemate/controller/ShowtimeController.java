package com.moviemate.controller;

import com.moviemate.model.Seat;
import com.moviemate.model.Showtime;
import com.moviemate.model.dto.ApiResponse;
import com.moviemate.service.ShowtimeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/showtimes")
public class ShowtimeController {

    private final ShowtimeService showtimeService;

    public ShowtimeController(ShowtimeService showtimeService) {
        this.showtimeService = showtimeService;
    }

    /**
     * GET /api/showtimes?movieId={id}&city={city}&date={date}
     * Lists available showtimes matching movie, city, and date.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<Showtime>>> getShowtimes(
            @RequestParam(required = false) String movieId,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String date) {

        List<Showtime> showtimes = showtimeService.getShowtimes(movieId, city, date);
        return ResponseEntity.ok(ApiResponse.ok("Showtimes fetched successfully", showtimes));
    }

    /**
     * GET /api/showtimes/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Showtime>> getShowtimeById(@PathVariable String id) {
        try {
            Showtime showtime = showtimeService.getShowtimeById(id);
            return ResponseEntity.ok(ApiResponse.ok("Showtime details fetched", showtime));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    /**
     * GET /api/showtimes/{id}/seats
     * Returns the 8x10 visual seat layout with real-time booked status from MongoDB.
     */
    @GetMapping("/{id}/seats")
    public ResponseEntity<ApiResponse<List<Seat>>> getSeats(@PathVariable String id) {
        try {
            List<Seat> seats = showtimeService.getSeatLayoutForShowtime(id);
            return ResponseEntity.ok(ApiResponse.ok("Seat layout fetched successfully", seats));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }
}
