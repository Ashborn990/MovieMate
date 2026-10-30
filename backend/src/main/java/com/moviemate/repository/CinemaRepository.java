package com.moviemate.repository;

import com.moviemate.model.Cinema;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CinemaRepository extends MongoRepository<Cinema, String> {

    List<Cinema> findByCityIgnoreCase(String city);
}
