package com.moviemate.service;

import com.moviemate.model.Cinema;
import com.moviemate.repository.CinemaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CinemaService {

    private final CinemaRepository cinemaRepository;

    public CinemaService(CinemaRepository cinemaRepository) {
        this.cinemaRepository = cinemaRepository;
    }

    public List<Cinema> getCinemas(String city) {
        if (city != null && !city.isBlank() && !city.equalsIgnoreCase("All")) {
            return cinemaRepository.findByCityIgnoreCase(city.trim());
        }
        return cinemaRepository.findAll();
    }

    public Cinema getCinemaById(String id) {
        return cinemaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cinema not found with ID: " + id));
    }

    public List<String> getAllCities() {
        return cinemaRepository.findAll().stream()
                .map(Cinema::getCity)
                .filter(c -> c != null && !c.isBlank())
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }
}
