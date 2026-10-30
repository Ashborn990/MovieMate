package com.moviemate.service;

import com.mongodb.client.result.UpdateResult;
import com.moviemate.model.Booking;
import com.moviemate.model.Cinema;
import com.moviemate.model.Movie;
import com.moviemate.model.Showtime;
import com.moviemate.model.User;
import com.moviemate.model.dto.BookingRequest;
import com.moviemate.repository.BookingRepository;
import com.moviemate.repository.CinemaRepository;
import com.moviemate.repository.MovieRepository;
import com.moviemate.repository.ShowtimeRepository;
import com.moviemate.repository.UserRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.HashSet;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ShowtimeRepository showtimeRepository;
    private final MovieRepository movieRepository;
    private final CinemaRepository cinemaRepository;
    private final UserRepository userRepository;
    private final MongoTemplate mongoTemplate;

    public BookingService(BookingRepository bookingRepository,
                          ShowtimeRepository showtimeRepository,
                          MovieRepository movieRepository,
                          CinemaRepository cinemaRepository,
                          UserRepository userRepository,
                          MongoTemplate mongoTemplate) {
        this.bookingRepository = bookingRepository;
        this.showtimeRepository = showtimeRepository;
        this.movieRepository = movieRepository;
        this.cinemaRepository = cinemaRepository;
        this.userRepository = userRepository;
        this.mongoTemplate = mongoTemplate;
    }


    private void validateSeats(List<String> seats, Showtime showtime) {

        if (seats == null || seats.isEmpty()) {
            throw new IllegalArgumentException(
                    "At least one seat must be selected"
            );
        }

        if (showtime.getTotalSeats() <= 0) {
            throw new IllegalStateException("Invalid theatre seat capacity");
        }

        if (seats.size() > showtime.getTotalSeats()) {
            throw new IllegalArgumentException(
                    "Selected seats exceed theatre capacity"
            );
        }

        Set<String> uniqueSeats = new HashSet<>();

        // Valid seats: A1-A10, B1-B10 ... H1-H10
        Pattern seatPattern = Pattern.compile("^[A-H](?:[1-9]|10)$");

        for (String seat : seats) {

            if (seat == null || seat.isBlank()) {
                throw new IllegalArgumentException(
                        "Invalid seat selection"
                );
            }

            String normalizedSeat = seat.trim().toUpperCase();

            if (!seatPattern.matcher(normalizedSeat).matches()) {
                throw new IllegalArgumentException(
                        "Invalid seat number: " + seat
                );
            }

            if (!uniqueSeats.add(normalizedSeat)) {
                throw new IllegalArgumentException(
                        "Duplicate seat selected: " + normalizedSeat
                );
            }
        }
    }


    /**
     * Confirms and reserves seats atomically.
     * We perform an atomic update on the showtime document:
     * We search for the showtime where NONE of the requested seats exist in 'bookedSeats' ($nin).
     * If valid, MongoDB atomically pushes ($push / $each) the requested seats into 'bookedSeats'.
     * If two users click 'Book' at the exact same millisecond:
     * - User A's update succeeds (modifiedCount = 1).
     * - User B's update fails because the condition ($nin) is no longer met (modifiedCount = 0).
     * This provides 100% thread safety without complex distributed locking!
     */

    public Booking createBooking(BookingRequest request, Long authenticatedUserId) {

        if (request == null) {
            throw new IllegalArgumentException("Booking request is required");
        }

        if (authenticatedUserId == null) {
            throw new IllegalArgumentException("User authentication is required");
        }

        // 1. Fetch user details from MySQL
        User user = userRepository.findById(authenticatedUserId)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));

        // 2. Fetch Showtime from MongoDB
        Showtime showtime = showtimeRepository.findById(request.getShowtimeId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Showtime not found"));

        // 3. Get and validate selected seats
        List<String> requestedSeats = request.getSeats();

        validateSeats(requestedSeats, showtime);

        // 4. Normalize selected seats
        requestedSeats = requestedSeats.stream()
                .map(seat -> seat.trim().toUpperCase())
                .toList();

        // 5. Atomically reserve seats in MongoDB
        Query query = new Query(
                Criteria.where("_id").is(request.getShowtimeId())
                        .and("bookedSeats").nin(requestedSeats)
        );

        Update update = new Update()
                .push("bookedSeats").each(requestedSeats.toArray());

        UpdateResult result =
                mongoTemplate.updateFirst(query, update, Showtime.class);

        // 6. Reject booking if seats could not be reserved
        if (result.getModifiedCount() != 1) {
            throw new IllegalStateException(
                    "One or more selected seats are already booked. " +
                            "Please choose different seats."
            );
        }

        /*
         * Seats are now reserved.
         * All remaining booking operations are inside try
         * so that failures can trigger seat rollback.
         */
        try {

            // 7. Fetch Movie and Cinema details
            Movie movie = movieRepository.findById(showtime.getMovieId())
                    .orElse(null);

            Cinema cinema = cinemaRepository.findById(showtime.getCinemaId())
                    .orElse(null);

            // 8. Calculate ticket price
            double ticketBasePrice = showtime.getTicketPrice();
            double subtotal = 0.0;

            for (String seat : requestedSeats) {

                char row = seat.charAt(0);

                if (row >= 'C' && row <= 'F') {
                    subtotal += ticketBasePrice * 1.15;
                } else if (row >= 'G') {
                    subtotal += ticketBasePrice * 1.30;
                } else {
                    subtotal += ticketBasePrice;
                }
            }

            subtotal = Math.round(subtotal * 100.0) / 100.0;

            double convenienceFee =
                    Math.round(1.50 * requestedSeats.size() * 100.0) / 100.0;

            double totalAmount =
                    Math.round((subtotal + convenienceFee) * 100.0) / 100.0;

            // 9. Generate booking reference
            String bookingRef = "MM-BKG-" +
                    UUID.randomUUID().toString().toUpperCase();

            // 10. Create booking document
            Booking booking = new Booking();

            booking.setBookingId(bookingRef);
            booking.setUserId(String.valueOf(user.getId()));
            booking.setUserEmail(user.getEmail());
            booking.setUserName(user.getFullName());

            booking.setShowtimeId(showtime.getId());
            booking.setMovieTitle(showtime.getMovieTitle());
            booking.setMoviePoster(movie != null ? movie.getPosterUrl() : "");

            booking.setCinemaName(showtime.getCinemaName());
            booking.setCinemaAddress(
                    cinema != null ? cinema.getAddress() : showtime.getCity()
            );

            booking.setScreenNumber(showtime.getScreenNumber());
            booking.setShowDate(showtime.getShowDate());
            booking.setStartTime(showtime.getStartTime());

            booking.setSeats(requestedSeats);
            booking.setSeatCount(requestedSeats.size());

            booking.setTicketPrice(ticketBasePrice);
            booking.setConvenienceFee(convenienceFee);
            booking.setTotalAmount(totalAmount);

            booking.setStatus("CONFIRMED");

            booking.setBookingTimestamp(
                    LocalDateTime.now().format(
                            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
                    )
            );

            // 11. Save booking in MongoDB
            return bookingRepository.save(booking);

        } catch (RuntimeException e) {

            // 12. Booking process failed. Attempt to release reserved seats.
            try {

                Query rollbackQuery = new Query(
                        Criteria.where("_id").is(request.getShowtimeId())
                                .and("bookedSeats").all(requestedSeats)
                );

                Update rollbackUpdate = new Update()
                        .pullAll("bookedSeats", requestedSeats.toArray());

                mongoTemplate.updateFirst(
                        rollbackQuery,
                        rollbackUpdate,
                        Showtime.class
                );

            } catch (RuntimeException rollbackException) {

                // Preserve the original exception and report rollback failure.
                e.addSuppressed(rollbackException);
            }

            throw new IllegalStateException(
                    "Booking could not be completed. Please try again.",
                    e
            );
        }
    }


    /**
     * Retrieves all bookings for the currently authenticated user.
     */
    public List<Booking> getUserBookings(Long authenticatedUserId) {
        return bookingRepository.findByUserIdOrderByBookingTimestampDesc(String.valueOf(authenticatedUserId));
    }

    /**
     * Retrieves a single booking by booking ID.
     * Prevents IDOR (Insecure Direct Object Reference) by ensuring only the owner can view it!
     */
    public Booking getBookingById(String bookingId, Long authenticatedUserId) {
        Booking booking = bookingRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found with reference: " + bookingId));

        if (!booking.getUserId().equals(String.valueOf(authenticatedUserId))) {
            throw new SecurityException("Access denied: You are not authorized to view another user's ticket.");
        }

        return booking;
    }
}
