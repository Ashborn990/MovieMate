package com.moviemate.repository;

import com.moviemate.model.Showtime;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowtimeRepository extends MongoRepository<Showtime, String> {

    List<Showtime> findByMovieId(String movieId);

    List<Showtime> findByMovieIdAndCityIgnoreCase(String movieId, String city);

    List<Showtime> findByMovieIdAndCityIgnoreCaseAndShowDate(String movieId, String city, String showDate);

    List<Showtime> findByCinemaId(String cinemaId);

    List<Showtime> findByCinemaIdAndShowDate(String cinemaId, String showDate);
}
