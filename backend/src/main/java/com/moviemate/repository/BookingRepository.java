package com.moviemate.repository;

import com.moviemate.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {

    List<Booking> findByUserIdOrderByBookingTimestampDesc(String userId);

    Optional<Booking> findByBookingId(String bookingId);
}
