package com.moviemate.controller;

import com.moviemate.model.Cinema;
import com.moviemate.model.dto.ApiResponse;
import com.moviemate.service.CinemaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cinemas")
public class CinemaController {

    private final CinemaService cinemaService;

    public CinemaController(CinemaService cinemaService) {
        this.cinemaService = cinemaService;
    }

    /**
     * GET /api/cinemas?city={city}
     * Returns list of cinema halls in a given city or all cinemas.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<Cinema>>> getCinemas(@RequestParam(required = false) String city) {
        List<Cinema> cinemas = cinemaService.getCinemas(city);
        return ResponseEntity.ok(ApiResponse.ok("Cinemas fetched successfully", cinemas));
    }

    /**
     * GET /api/cinemas/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Cinema>> getCinemaById(@PathVariable String id) {
        try {
            Cinema cinema = cinemaService.getCinemaById(id);
            return ResponseEntity.ok(ApiResponse.ok("Cinema details fetched", cinema));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    /**
     * GET /api/cinemas/cities
     */
    @GetMapping("/cities")
    public ResponseEntity<ApiResponse<List<String>>> getCities() {
        return ResponseEntity.ok(ApiResponse.ok("Cities fetched", cinemaService.getAllCities()));
    }
}
