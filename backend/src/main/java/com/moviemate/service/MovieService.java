package com.moviemate.service;

import com.moviemate.model.Movie;
import com.moviemate.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> getAllMovies(String genre, String language, String search) {
        List<Movie> movies = movieRepository.findAll();

        if (genre != null && !genre.isBlank() && !genre.equalsIgnoreCase("All")) {
            movies = movies.stream()
                    .filter(m -> m.getGenre() != null && m.getGenre().equalsIgnoreCase(genre.trim()))
                    .collect(Collectors.toList());
        }

        if (language != null && !language.isBlank() && !language.equalsIgnoreCase("All")) {
            movies = movies.stream()
                    .filter(m -> m.getLanguage() != null && m.getLanguage().equalsIgnoreCase(language.trim()))
                    .collect(Collectors.toList());
        }

        if (search != null && !search.isBlank()) {
            String lowerSearch = search.trim().toLowerCase();
            movies = movies.stream()
                    .filter(m -> (m.getTitle() != null && m.getTitle().toLowerCase().contains(lowerSearch))
                            || (m.getDescription() != null && m.getDescription().toLowerCase().contains(lowerSearch))
                            || (m.getGenre() != null && m.getGenre().toLowerCase().contains(lowerSearch)))
                    .collect(Collectors.toList());
        }

        return movies;
    }

    public Movie getMovieById(String id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Movie not found with ID: " + id));
    }

    public List<String> getAllGenres() {
        return movieRepository.findAll().stream()
                .map(Movie::getGenre)
                .filter(g -> g != null && !g.isBlank())
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

    public List<String> getAllLanguages() {
        return movieRepository.findAll().stream()
                .map(Movie::getLanguage)
                .filter(l -> l != null && !l.isBlank())
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }
}
