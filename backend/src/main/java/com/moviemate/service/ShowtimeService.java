package com.moviemate.service;

import com.moviemate.model.Seat;
import com.moviemate.model.Showtime;
import com.moviemate.repository.ShowtimeRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShowtimeService {

    private final ShowtimeRepository showtimeRepository;

    public ShowtimeService(ShowtimeRepository showtimeRepository) {
        this.showtimeRepository = showtimeRepository;
    }

    public List<Showtime> getShowtimes(String movieId, String city, String date) {
        List<Showtime> list = showtimeRepository.findAll();

        if (movieId != null && !movieId.isBlank()) {
            list = list.stream()
                    .filter(s -> s.getMovieId() != null && s.getMovieId().equalsIgnoreCase(movieId.trim()))
                    .collect(Collectors.toList());
        }

        if (city != null && !city.isBlank() && !city.equalsIgnoreCase("All")) {
            list = list.stream()
                    .filter(s -> s.getCity() != null && s.getCity().equalsIgnoreCase(city.trim()))
                    .collect(Collectors.toList());
        }

        if (date != null && !date.isBlank()) {
            list = list.stream()
                    .filter(s -> s.getShowDate() != null && s.getShowDate().equalsIgnoreCase(date.trim()))
                    .collect(Collectors.toList());
        }

        return list;
    }

    public Showtime getShowtimeById(String id) {
        return showtimeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Showtime not found with ID: " + id));
    }

    /**
     * Generates a visual 8x10 seating grid (80 seats total: Rows A to H, Cols 1 to 10)
     * and flags each seat as available or already booked based on MongoDB showtime data.
     */
    public List<Seat> getSeatLayoutForShowtime(String showtimeId) {
        Showtime showtime = getShowtimeById(showtimeId);
        List<String> bookedSeats = showtime.getBookedSeats() != null ? showtime.getBookedSeats() : new ArrayList<>();

        List<Seat> layout = new ArrayList<>();
        char[] rowLetters = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'};

        for (char row : rowLetters) {
            String tier = "Standard";
            double seatPrice = showtime.getTicketPrice();

            if (row >= 'C' && row <= 'F') {
                tier = "Premium";
                seatPrice = Math.round((showtime.getTicketPrice() * 1.15) * 100.0) / 100.0;
            } else if (row >= 'G') {
                tier = "VIP Recliner";
                seatPrice = Math.round((showtime.getTicketPrice() * 1.30) * 100.0) / 100.0;
            }

            for (int col = 1; col <= 10; col++) {
                String seatCode = "" + row + col;
                boolean isBooked = bookedSeats.contains(seatCode);
                layout.add(new Seat(seatCode, String.valueOf(row), col, tier, seatPrice, isBooked));
            }
        }

        return layout;
    }
}
