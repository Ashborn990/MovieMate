package com.moviemate.repository;

import com.moviemate.model.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends MongoRepository<Movie, String> {

    List<Movie> findByStatus(String status);

    List<Movie> findByGenreIgnoreCase(String genre);

    List<Movie> findByLanguageIgnoreCase(String language);

    List<Movie> findByTitleContainingIgnoreCase(String keyword);
}
