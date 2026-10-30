package com.moviemate.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * Showtime Document for MongoDB (moviemate.showtimes)
 * Maintains real-time seat inventory for a specific screening.
 */
@Document(collection = "showtimes")
public class Showtime {

    @Id
    private String id;
    private String movieId;
    private String movieTitle;
    private String cinemaId;
    private String cinemaName;
    private String city;
    private int screenNumber;
    private String showDate; // YYYY-MM-DD
    private String startTime; // e.g. "10:00 AM", "01:30 PM"
    private double ticketPrice;
    private int totalSeats;
    private List<String> bookedSeats = new ArrayList<>();

    public Showtime() {}

    public Showtime(String id, String movieId, String movieTitle, String cinemaId, String cinemaName,
                    String city, int screenNumber, String showDate, String startTime,
                    double ticketPrice, int totalSeats, List<String> bookedSeats) {
        this.id = id;
        this.movieId = movieId;
        this.movieTitle = movieTitle;
        this.cinemaId = cinemaId;
        this.cinemaName = cinemaName;
        this.city = city;
        this.screenNumber = screenNumber;
        this.showDate = showDate;
        this.startTime = startTime;
        this.ticketPrice = ticketPrice;
        this.totalSeats = totalSeats;
        this.bookedSeats = bookedSeats != null ? bookedSeats : new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public String getCinemaId() {
        return cinemaId;
    }

    public void setCinemaId(String cinemaId) {
        this.cinemaId = cinemaId;
    }

    public String getCinemaName() {
        return cinemaName;
    }

    public void setCinemaName(String cinemaName) {
        this.cinemaName = cinemaName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getScreenNumber() {
        return screenNumber;
    }

    public void setScreenNumber(int screenNumber) {
        this.screenNumber = screenNumber;
    }

    public String getShowDate() {
        return showDate;
    }

    public void setShowDate(String showDate) {
        this.showDate = showDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public double getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public int getTotalSeats() {
        return totalSeats;
    }

    public void setTotalSeats(int totalSeats) {
        this.totalSeats = totalSeats;
    }

    public List<String> getBookedSeats() {
        return bookedSeats;
    }

    public void setBookedSeats(List<String> bookedSeats) {
        this.bookedSeats = bookedSeats;
    }
}
