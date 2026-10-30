package com.moviemate.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * Booking Document for MongoDB (moviemate.bookings)
 * Contains the complete, confirmed ticket details.
 * 
 * Note: userId points to the user's primary key in MySQL.
 * In a polyglot persistence architecture, we store the relational user ID
 * directly in the document without needing an impossible cross-database foreign key!
 */
@Document(collection = "bookings")
public class Booking {

    @Id
    private String id;
    private String bookingId; // Human-friendly reference e.g., MM-BKG-84291
    private String userId; // Reference to MySQL user ID
    private String userEmail;
    private String userName;
    private String showtimeId;
    private String movieTitle;
    private String moviePoster;
    private String cinemaName;
    private String cinemaAddress;
    private int screenNumber;
    private String showDate;
    private String startTime;
    private List<String> seats = new ArrayList<>();
    private int seatCount;
    private double ticketPrice;
    private double convenienceFee;
    private double totalAmount;
    private String status; // CONFIRMED, CANCELLED
    private String bookingTimestamp;

    public Booking() {}

    public Booking(String id, String bookingId, String userId, String userEmail, String userName,
                   String showtimeId, String movieTitle, String moviePoster, String cinemaName,
                   String cinemaAddress, int screenNumber, String showDate, String startTime,
                   List<String> seats, int seatCount, double ticketPrice, double convenienceFee,
                   double totalAmount, String status, String bookingTimestamp) {
        this.id = id;
        this.bookingId = bookingId;
        this.userId = userId;
        this.userEmail = userEmail;
        this.userName = userName;
        this.showtimeId = showtimeId;
        this.movieTitle = movieTitle;
        this.moviePoster = moviePoster;
        this.cinemaName = cinemaName;
        this.cinemaAddress = cinemaAddress;
        this.screenNumber = screenNumber;
        this.showDate = showDate;
        this.startTime = startTime;
        this.seats = seats != null ? seats : new ArrayList<>();
        this.seatCount = seatCount;
        this.ticketPrice = ticketPrice;
        this.convenienceFee = convenienceFee;
        this.totalAmount = totalAmount;
        this.status = status;
        this.bookingTimestamp = bookingTimestamp;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(String showtimeId) {
        this.showtimeId = showtimeId;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public String getMoviePoster() {
        return moviePoster;
    }

    public void setMoviePoster(String moviePoster) {
        this.moviePoster = moviePoster;
    }

    public String getCinemaName() {
        return cinemaName;
    }

    public void setCinemaName(String cinemaName) {
        this.cinemaName = cinemaName;
    }

    public String getCinemaAddress() {
        return cinemaAddress;
    }

    public void setCinemaAddress(String cinemaAddress) {
        this.cinemaAddress = cinemaAddress;
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

    public List<String> getSeats() {
        return seats;
    }

    public void setSeats(List<String> seats) {
        this.seats = seats;
    }

    public int getSeatCount() {
        return seatCount;
    }

    public void setSeatCount(int seatCount) {
        this.seatCount = seatCount;
    }

    public double getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public double getConvenienceFee() {
        return convenienceFee;
    }

    public void setConvenienceFee(double convenienceFee) {
        this.convenienceFee = convenienceFee;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getBookingTimestamp() {
        return bookingTimestamp;
    }

    public void setBookingTimestamp(String bookingTimestamp) {
        this.bookingTimestamp = bookingTimestamp;
    }
}
