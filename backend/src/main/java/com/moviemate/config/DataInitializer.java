package com.moviemate.config;

import com.moviemate.model.Booking;
import com.moviemate.model.Cinema;
import com.moviemate.model.Movie;
import com.moviemate.model.Showtime;
import com.moviemate.model.User;
import com.moviemate.repository.BookingRepository;
import com.moviemate.repository.CinemaRepository;
import com.moviemate.repository.MovieRepository;
import com.moviemate.repository.ShowtimeRepository;
import com.moviemate.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * DataInitializer: Seeds essential starter data into MySQL and MongoDB on startup
 * so the application works immediately out-of-the-box without manual database insertion!
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final CinemaRepository cinemaRepository;
    private final ShowtimeRepository showtimeRepository;
    private final BookingRepository bookingRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           MovieRepository movieRepository,
                           CinemaRepository cinemaRepository,
                           ShowtimeRepository showtimeRepository,
                           BookingRepository bookingRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
        this.cinemaRepository = cinemaRepository;
        this.showtimeRepository = showtimeRepository;
        this.bookingRepository = bookingRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        initMySQLUserTable();
        initMongoData();
    }

    private void initMySQLUserTable() {
        try {
            userRepository.ensureTableExists();

            if (!userRepository.existsByEmail("john.doe@example.com")) {
                User demoUser = new User();
                demoUser.setFullName("John Doe");
                demoUser.setEmail("john.doe@example.com");
                demoUser.setPhone("9876543210");
                demoUser.setPasswordHash(passwordEncoder.encode("Password@123"));
                demoUser.setCreatedAt(LocalDateTime.now());
                userRepository.save(demoUser);
                System.out.println(">> Demo user seeded into MySQL (john.doe@example.com / Password@123)");
            }
        } catch (Exception e) {
            System.err.println(">> Notice: MySQL initialization encountered: " + e.getMessage());
        }
    }

    private void initMongoData() {
        try {
            // 1. Seed or Refresh Movies
            List<Movie> movies = List.of(
                    new Movie("mov_kalki", "Kalki 2898 AD",
                            "In a dystopian post-apocalyptic city of Kashi in the year 2898 AD, a legendary protector rises to safeguard an unborn incarnation prophesied to restore cosmic balance.",
                            "Sci-Fi", "Hindi", "3h 01m", "2024-06-27", 8.2,
                            "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
                            "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
                            "NOW_SHOWING", true),
                    new Movie("mov_rrr", "RRR: Rise Roar Revolt",
                            "A fearless revolutionary and an officer in the British force decide to join forces to fight against oppressive imperial rule in 1920s India.",
                            "Action", "Telugu", "3h 07m", "2022-03-25", 8.8,
                            "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80",
                            "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1600&auto=format&fit=crop&q=80",
                            "NOW_SHOWING", true),
                    new Movie("mov_jawan", "Jawan",
                            "Driven by a personal vendetta and a promise made years ago, a man seeks to right the wrongs in society while confronting a monstrous outlaw.",
                            "Action", "Hindi", "2h 49m", "2023-09-07", 7.8,
                            "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
                            "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600&auto=format&fit=crop&q=80",
                            "NOW_SHOWING", true),
                    new Movie("mov_stree2", "Stree 2: Sarkate Ka Aatank",
                            "The town of Chanderi is haunted once again by a sinister headless entity named 'Sarkata'. The fearless local squad reunites to save their town.",
                            "Comedy", "Hindi", "2h 27m", "2024-08-15", 8.0,
                            "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
                            "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1600&auto=format&fit=crop&q=80",
                            "NOW_SHOWING", true),
                    new Movie("mov_kantara", "Kantara: Legend of the Forest",
                            "When human greed leads to a conflict between villagers and the forest department, a youth channels his ancestral spiritual roots to defend sacred heritage.",
                            "Thriller", "Kannada", "2h 28m", "2022-09-30", 8.4,
                            "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80",
                            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80",
                            "NOW_SHOWING", true),
                    new Movie("mov_pushpa2", "Pushpa 2: The Rule",
                            "Pushpa Raj expands his red sandalwood empire while engaging in a fierce clash of wills against ruthless police officer Bhanwar Singh Shekhawat.",
                            "Action", "Telugu", "2h 55m", "2024-12-05", 8.7,
                            "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80",
                            "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
                            "NOW_SHOWING", true),
                    new Movie("mov_dangal", "Dangal",
                            "Former wrestler Mahavir Singh Phogat overcomes social stigma and trains his daughters to become international wrestling champions.",
                            "Drama", "Hindi", "2h 41m", "2016-12-23", 8.9,
                            "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&auto=format&fit=crop&q=80",
                            "https://images.unsplash.com/photo-1465447142348-e9952c393450?w=1600&auto=format&fit=crop&q=80",
                            "NOW_SHOWING", false),
                    new Movie("mov_upcoming_war2", "War 2: Shadow Protocol",
                            "Major Kabir Dhaliwal returns on a high-stakes covert mission across multiple continents, facing his fiercest rival in a deadly game.",
                            "Action", "Hindi", "2h 45m", "2025-08-14", 0.0,
                            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
                            "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&auto=format&fit=crop&q=80",
                            "UPCOMING", false)
            );
            movieRepository.saveAll(movies);
            System.out.println(">> Movies verified/seeded into MongoDB (" + movies.size() + " movies)");

            // 2. Seed or Refresh Cinemas
            List<Cinema> cinemas = List.of(
                    new Cinema("cin_mum_pvr", "PVR INOX Gold (Palladium)", "Mumbai", "Phoenix Palladium, Senapati Bapat Marg, Lower Parel", 9, "₹350 - ₹650"),
                    new Cinema("cin_del_select", "PVR Directors Cut (Vasant Kunj)", "Delhi", "Ambience Mall, Nelson Mandela Marg, Vasant Kunj", 8, "₹400 - ₹800"),
                    new Cinema("cin_blr_forum", "PVR Superplex (Forum Mall)", "Bengaluru", "The Forum Mall, Hosur Road, Koramangala", 11, "₹300 - ₹600"),
                    new Cinema("cin_hyd_prasad", "Prasads Multiplex (IMAX Screen)", "Hyderabad", "NTR Gardens, Khairatabad", 7, "₹250 - ₹500"),
                    new Cinema("cin_nyc_amc", "MovieMate Grand Cinema (Times Square)", "New York", "234 W 42nd St, New York, NY 10036", 8, "$14.00 - $18.50"),
                    new Cinema("cin_la_chinese", "CineDome Hollywood", "Los Angeles", "6925 Hollywood Blvd, Los Angeles, CA 90028", 10, "$15.00 - $20.00")
            );
            cinemaRepository.saveAll(cinemas);
            System.out.println(">> Cinemas verified/seeded into MongoDB (" + cinemas.size() + " cinemas)");

            // 3. Seed or Refresh Showtimes across today, tomorrow, and day after tomorrow
            String today = LocalDate.now().toString();
            String tomorrow = LocalDate.now().plusDays(1).toString();
            String dayAfter = LocalDate.now().plusDays(2).toString();

            List<Showtime> showtimes = List.of(
                    // Kalki 2898 AD in Mumbai & Delhi
                    new Showtime("shw_101", "mov_kalki", "Kalki 2898 AD",
                            "cin_mum_pvr", "PVR INOX Gold (Palladium)", "Mumbai", 1, today, "10:30 AM", 350.00, 80,
                            new ArrayList<>(List.of("A3", "A4", "B5", "B6", "F4", "F5"))),
                    new Showtime("shw_102", "mov_kalki", "Kalki 2898 AD",
                            "cin_mum_pvr", "PVR INOX Gold (Palladium)", "Mumbai", 1, today, "02:15 PM", 420.00, 80,
                            new ArrayList<>(List.of("C1", "C2", "D4", "D5", "D6", "E7", "E8"))),
                    new Showtime("shw_103", "mov_kalki", "Kalki 2898 AD",
                            "cin_del_select", "PVR Directors Cut (Vasant Kunj)", "Delhi", 2, today, "06:00 PM", 450.00, 80,
                            new ArrayList<>(List.of("E4", "E5", "E6", "F7", "G1", "G2"))),
                    new Showtime("shw_103b", "mov_kalki", "Kalki 2898 AD",
                            "cin_mum_pvr", "PVR INOX Gold (Palladium)", "Mumbai", 1, tomorrow, "06:30 PM", 450.00, 80,
                            new ArrayList<>(List.of("A1", "A2"))),

                    // RRR in Hyderabad & Mumbai
                    new Showtime("shw_104", "mov_rrr", "RRR: Rise Roar Revolt",
                            "cin_hyd_prasad", "Prasads Multiplex (IMAX Screen)", "Hyderabad", 1, today, "11:00 AM", 300.00, 80,
                            new ArrayList<>(List.of("A1", "A2", "H5", "H6"))),
                    new Showtime("shw_105", "mov_rrr", "RRR: Rise Roar Revolt",
                            "cin_mum_pvr", "PVR INOX Gold (Palladium)", "Mumbai", 2, today, "03:45 PM", 380.00, 80,
                            new ArrayList<>(List.of("B1", "B2"))),
                    new Showtime("shw_105b", "mov_rrr", "RRR: Rise Roar Revolt",
                            "cin_hyd_prasad", "Prasads Multiplex (IMAX Screen)", "Hyderabad", 1, tomorrow, "04:00 PM", 320.00, 80,
                            new ArrayList<>()),

                    // Jawan in Mumbai & Delhi
                    new Showtime("shw_106", "mov_jawan", "Jawan",
                            "cin_mum_pvr", "PVR INOX Gold (Palladium)", "Mumbai", 3, today, "01:00 PM", 380.00, 80,
                            new ArrayList<>(List.of("B1", "B2", "C3", "C4"))),
                    new Showtime("shw_106b", "mov_jawan", "Jawan",
                            "cin_del_select", "PVR Directors Cut (Vasant Kunj)", "Delhi", 1, today, "08:00 PM", 400.00, 80,
                            new ArrayList<>()),

                    // Stree 2 in Delhi & Mumbai
                    new Showtime("shw_107", "mov_stree2", "Stree 2: Sarkate Ka Aatank",
                            "cin_del_select", "PVR Directors Cut (Vasant Kunj)", "Delhi", 4, today, "04:30 PM", 350.00, 80,
                            new ArrayList<>(List.of("C4", "C5", "D7", "D8"))),
                    new Showtime("shw_107b", "mov_stree2", "Stree 2: Sarkate Ka Aatank",
                            "cin_mum_pvr", "PVR INOX Gold (Palladium)", "Mumbai", 2, today, "07:15 PM", 380.00, 80,
                            new ArrayList<>(List.of("F1", "F2"))),

                    // Pushpa 2 in Bengaluru & Hyderabad
                    new Showtime("shw_108", "mov_pushpa2", "Pushpa 2: The Rule",
                            "cin_blr_forum", "PVR Superplex (Forum Mall)", "Bengaluru", 2, today, "07:30 PM", 400.00, 80,
                            new ArrayList<>(List.of("E3", "E4", "F5"))),
                    new Showtime("shw_108b", "mov_pushpa2", "Pushpa 2: The Rule",
                            "cin_hyd_prasad", "Prasads Multiplex (IMAX Screen)", "Hyderabad", 2, today, "08:45 PM", 350.00, 80,
                            new ArrayList<>(List.of("C3", "C4"))),

                    // Kantara in Bengaluru & Mumbai
                    new Showtime("shw_109", "mov_kantara", "Kantara: Legend of the Forest",
                            "cin_blr_forum", "PVR Superplex (Forum Mall)", "Bengaluru", 3, today, "08:15 PM", 320.00, 80,
                            new ArrayList<>(List.of("G4", "G5", "G6"))),

                    // Dangal in Delhi
                    new Showtime("shw_110", "mov_dangal", "Dangal",
                            "cin_del_select", "PVR Directors Cut (Vasant Kunj)", "Delhi", 1, today, "01:15 PM", 300.00, 80,
                            new ArrayList<>(List.of("B3", "B4")))
            );

            int insertedCount = 0;

            for (Showtime showtime : showtimes) {
                if (!showtimeRepository.existsById(showtime.getId())) {
                    showtimeRepository.save(showtime);
                    insertedCount++;
                }
            }

            System.out.println(
                    ">> Showtimes initialized. New showtimes inserted: " + insertedCount
            );

            System.out.println(">> Showtimes verified/seeded into MongoDB (" + showtimes.size() + " showtimes)");

            // 4. Seed Sample Confirmed Bookings for demo user (id: "1", john.doe@example.com)
            if (bookingRepository.count() == 0) {
                List<Booking> bookings = List.of(
                        new Booking(
                                null,
                                "MM-BKG-10001",
                                "1",
                                "john.doe@example.com",
                                "John Doe",
                                "shw_101",
                                "Kalki 2898 AD",
                                "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
                                "PVR INOX Gold (Palladium)",
                                "Phoenix Palladium, Senapati Bapat Marg, Lower Parel",
                                1,
                                today,
                                "10:30 AM",
                                List.of("A3", "A4"),
                                2,
                                350.00,
                                50.00,
                                750.00,
                                "CONFIRMED",
                                LocalDateTime.now().minusHours(2).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                        ),
                        new Booking(
                                null,
                                "MM-BKG-10002",
                                "1",
                                "john.doe@example.com",
                                "John Doe",
                                "shw_104",
                                "RRR: Rise Roar Revolt",
                                "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80",
                                "Prasads Multiplex (IMAX Screen)",
                                "NTR Gardens, Khairatabad",
                                1,
                                today,
                                "11:00 AM",
                                List.of("A1", "A2"),
                                2,
                                300.00,
                                50.00,
                                650.00,
                                "CONFIRMED",
                                LocalDateTime.now().minusHours(5).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                        )
                );
                bookingRepository.saveAll(bookings);
                System.out.println(">> Confirmed Bookings seeded into MongoDB for John Doe (" + bookings.size() + " tickets)");
            }
        } catch (Exception e) {
            System.err.println(">> Notice: MongoDB initialization encountered: " + e.getMessage());
        }
    }
}
