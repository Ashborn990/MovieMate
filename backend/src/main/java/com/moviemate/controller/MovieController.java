package com.moviemate.controller;

import com.moviemate.model.Movie;
import com.moviemate.model.dto.ApiResponse;
import com.moviemate.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    /**
     * GET /api/movies?genre={genre}&language={lang}&search={query}
     * Public endpoint to browse and filter movies.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<Movie>>> getMovies(
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String language,
            @RequestParam(required = false) String search) {

        List<Movie> movies = movieService.getAllMovies(genre, language, search);
        return ResponseEntity.ok(ApiResponse.ok("Movies fetched successfully", movies));
    }

    /**
     * GET /api/movies/{id}
     * Public endpoint for detailed movie information.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Movie>> getMovieById(@PathVariable String id) {
        try {
            Movie movie = movieService.getMovieById(id);
            return ResponseEntity.ok(ApiResponse.ok("Movie details fetched", movie));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    /**
     * GET /api/movies/genres
     */
    @GetMapping("/genres")
    public ResponseEntity<ApiResponse<List<String>>> getGenres() {
        return ResponseEntity.ok(ApiResponse.ok("Genres fetched", movieService.getAllGenres()));
    }

    /**
     * GET /api/movies/languages
     */
    @GetMapping("/languages")
    public ResponseEntity<ApiResponse<List<String>>> getLanguages() {
        return ResponseEntity.ok(ApiResponse.ok("Languages fetched", movieService.getAllLanguages()));
    }
}
