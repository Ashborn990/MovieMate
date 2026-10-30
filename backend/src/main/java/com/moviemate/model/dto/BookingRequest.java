package com.moviemate.model.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

public class BookingRequest {

    @NotBlank(message = "Showtime ID is required")
    private String showtimeId;

    @NotEmpty(message = "At least one seat must be selected")
    private List<String> seats;

    public BookingRequest() {}

    public BookingRequest(String showtimeId, List<String> seats) {
        this.showtimeId = showtimeId;
        this.seats = seats;
    }

    public String getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(String showtimeId) {
        this.showtimeId = showtimeId;
    }

    public List<String> getSeats() {
        return seats;
    }

    public void setSeats(List<String> seats) {
        this.seats = seats;
    }
}
