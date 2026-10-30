// ==============================================================
// MovieMate - Movie Ticket Booking System
// Database: MongoDB (Movie Catalog, Showtimes, Seat Inventory, Bookings)
// Database Name: moviemate
// ==============================================================
// How to run:
// mongosh "mongodb://localhost:27017/moviemate" mongodb_sample_data.js

const db = connect("mongodb://localhost:27017/moviemate");

// 1. Drop existing collections to start fresh
db.movies.drop();
db.cinemas.drop();
db.showtimes.drop();
db.bookings.drop();

// 2. Insert Movies Collection (Featuring Indian Blockbusters & Global Cinema)
db.movies.insertMany([
  {
    _id: "mov_kalki",
    title: "Kalki 2898 AD",
    description: "In a dystopian post-apocalyptic city of Kashi in the year 2898 AD, a legendary protector rises to safeguard an unborn incarnation prophesied to restore cosmic balance.",
    genre: "Sci-Fi",
    language: "Hindi",
    duration: "3h 01m",
    releaseDate: "2024-06-27",
    rating: 8.2,
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    status: "NOW_SHOWING",
    isPopular: true
  },
  {
    _id: "mov_rrr",
    title: "RRR: Rise Roar Revolt",
    description: "A fearless revolutionary and an officer in the British force decide to join forces to fight against oppressive imperial rule in 1920s India.",
    genre: "Action",
    language: "Telugu",
    duration: "3h 07m",
    releaseDate: "2022-03-25",
    rating: 8.8,
    posterUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1600&auto=format&fit=crop&q=80",
    status: "NOW_SHOWING",
    isPopular: true
  },
  {
    _id: "mov_jawan",
    title: "Jawan",
    description: "Driven by a personal vendetta and a promise made years ago, a man seeks to right the wrongs in society while confronting a monstrous outlaw.",
    genre: "Action",
    language: "Hindi",
    duration: "2h 49m",
    releaseDate: "2023-09-07",
    rating: 7.8,
    posterUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600&auto=format&fit=crop&q=80",
    status: "NOW_SHOWING",
    isPopular: true
  },
  {
    _id: "mov_stree2",
    title: "Stree 2: Sarkate Ka Aatank",
    description: "The town of Chanderi is haunted once again by a sinister headless entity named 'Sarkata'. The fearless local squad reunites with the mysterious guardian to save their town.",
    genre: "Comedy",
    language: "Hindi",
    duration: "2h 27m",
    releaseDate: "2024-08-15",
    rating: 8.0,
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1600&auto=format&fit=crop&q=80",
    status: "NOW_SHOWING",
    isPopular: true
  },
  {
    _id: "mov_kantara",
    title: "Kantara: Legend of the Forest",
    description: "When human greed leads to a conflict between villagers and the forest department, a village youth channels his ancestral spiritual roots to defend sacred heritage.",
    genre: "Thriller",
    language: "Kannada",
    duration: "2h 28m",
    releaseDate: "2022-09-30",
    rating: 8.4,
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80",
    status: "NOW_SHOWING",
    isPopular: true
  },
  {
    _id: "mov_pushpa2",
    title: "Pushpa 2: The Rule",
    description: "Pushpa Raj expands his red sandalwood empire while engaging in a fierce clash of wills and power against ruthless police officer Bhanwar Singh Shekhawat.",
    genre: "Action",
    language: "Telugu",
    duration: "2h 55m",
    releaseDate: "2024-12-05",
    rating: 8.7,
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    status: "NOW_SHOWING",
    isPopular: true
  },
  {
    _id: "mov_dangal",
    title: "Dangal",
    description: "Former wrestler Mahavir Singh Phogat overcomes social stigma and trains his daughters Geeta and Babita to become international wrestling champions.",
    genre: "Drama",
    language: "Hindi",
    duration: "2h 41m",
    releaseDate: "2016-12-23",
    rating: 8.9,
    posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1465447142348-e9952c393450?w=1600&auto=format&fit=crop&q=80",
    status: "NOW_SHOWING",
    isPopular: false
  },
  {
    _id: "mov_upcoming_war2",
    title: "War 2: Shadow Protocol",
    description: "Major Kabir Dhaliwal returns on a high-stakes covert mission across multiple continents, facing his fiercest rival yet in a deadly game of counter-intelligence.",
    genre: "Action",
    language: "Hindi",
    duration: "2h 45m",
    releaseDate: "2025-08-14",
    rating: 0.0,
    posterUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&auto=format&fit=crop&q=80",
    status: "UPCOMING",
    isPopular: false
  }
]);

// 3. Insert Cinemas Collection
db.cinemas.insertMany([
  {
    _id: "cin_mum_pvr",
    name: "PVR INOX Gold (Palladium)",
    city: "Mumbai",
    address: "Phoenix Palladium, Senapati Bapat Marg, Lower Parel",
    screens: 9,
    priceRange: "₹350 - ₹650"
  },
  {
    _id: "cin_del_select",
    name: "PVR Directors Cut (Vasant Kunj)",
    city: "Delhi",
    address: "Ambience Mall, Nelson Mandela Marg, Vasant Kunj",
    screens: 8,
    priceRange: "₹400 - ₹800"
  },
  {
    _id: "cin_blr_forum",
    name: "PVR Superplex (Forum Mall)",
    city: "Bengaluru",
    address: "The Forum Mall, Hosur Road, Koramangala",
    screens: 11,
    priceRange: "₹300 - ₹600"
  },
  {
    _id: "cin_hyd_prasad",
    name: "Prasads Multiplex (IMAX Screen)",
    city: "Hyderabad",
    address: "NTR Gardens, Khairatabad",
    screens: 7,
    priceRange: "₹250 - ₹500"
  },
  {
    _id: "cin_nyc_amc",
    name: "MovieMate Grand Cinema (Times Square)",
    city: "New York",
    address: "234 W 42nd St, New York, NY 10036",
    screens: 8,
    priceRange: "$14.00 - $18.50"
  },
  {
    _id: "cin_la_chinese",
    name: "CineDome Hollywood",
    city: "Los Angeles",
    address: "6925 Hollywood Blvd, Los Angeles, CA 90028",
    screens: 10,
    priceRange: "$15.00 - $20.00"
  }
]);

// 4. Insert Showtimes Collection
// Total 80 seats per screen (Rows A to H, Cols 1 to 10)
db.showtimes.insertMany([
  {
    _id: "shw_101",
    movieId: "mov_kalki",
    movieTitle: "Kalki 2898 AD",
    cinemaId: "cin_mum_pvr",
    cinemaName: "PVR INOX Gold (Palladium)",
    city: "Mumbai",
    screenNumber: 1,
    showDate: "2026-10-28",
    startTime: "10:30 AM",
    ticketPrice: 350.00,
    totalSeats: 80,
    bookedSeats: ["A3", "A4", "B5", "B6", "F4", "F5"]
  },
  {
    _id: "shw_102",
    movieId: "mov_kalki",
    movieTitle: "Kalki 2898 AD",
    cinemaId: "cin_mum_pvr",
    cinemaName: "PVR INOX Gold (Palladium)",
    city: "Mumbai",
    screenNumber: 1,
    showDate: "2026-10-28",
    startTime: "02:15 PM",
    ticketPrice: 420.00,
    totalSeats: 80,
    bookedSeats: ["C1", "C2", "D4", "D5", "D6", "E7", "E8"]
  },
  {
    _id: "shw_103",
    movieId: "mov_kalki",
    movieTitle: "Kalki 2898 AD",
    cinemaId: "cin_del_select",
    cinemaName: "PVR Directors Cut (Vasant Kunj)",
    city: "Delhi",
    screenNumber: 2,
    showDate: "2026-10-28",
    startTime: "06:00 PM",
    ticketPrice: 450.00,
    totalSeats: 80,
    bookedSeats: ["E4", "E5", "E6", "F7", "G1", "G2"]
  },
  {
    _id: "shw_104",
    movieId: "mov_rrr",
    movieTitle: "RRR: Rise Roar Revolt",
    cinemaId: "cin_hyd_prasad",
    cinemaName: "Prasads Multiplex (IMAX Screen)",
    city: "Hyderabad",
    screenNumber: 1,
    showDate: "2026-10-28",
    startTime: "11:00 AM",
    ticketPrice: 300.00,
    totalSeats: 80,
    bookedSeats: ["A1", "A2", "H5", "H6"]
  },
  {
    _id: "shw_105",
    movieId: "mov_rrr",
    movieTitle: "RRR: Rise Roar Revolt",
    cinemaId: "cin_mum_pvr",
    cinemaName: "PVR INOX Gold (Palladium)",
    city: "Mumbai",
    screenNumber: 2,
    showDate: "2026-10-28",
    startTime: "03:45 PM",
    ticketPrice: 380.00,
    totalSeats: 80,
    bookedSeats: ["B1", "B2"]
  },
  {
    _id: "shw_106",
    movieId: "mov_jawan",
    movieTitle: "Jawan",
    cinemaId: "cin_mum_pvr",
    cinemaName: "PVR INOX Gold (Palladium)",
    city: "Mumbai",
    screenNumber: 3,
    showDate: "2026-10-28",
    startTime: "01:00 PM",
    ticketPrice: 380.00,
    totalSeats: 80,
    bookedSeats: ["B1", "B2", "C3", "C4"]
  },
  {
    _id: "shw_107",
    movieId: "mov_stree2",
    movieTitle: "Stree 2: Sarkate Ka Aatank",
    cinemaId: "cin_del_select",
    cinemaName: "PVR Directors Cut (Vasant Kunj)",
    city: "Delhi",
    screenNumber: 4,
    showDate: "2026-10-28",
    startTime: "04:30 PM",
    ticketPrice: 350.00,
    totalSeats: 80,
    bookedSeats: ["C4", "C5", "D7", "D8"]
  },
  {
    _id: "shw_108",
    movieId: "mov_pushpa2",
    movieTitle: "Pushpa 2: The Rule",
    cinemaId: "cin_blr_forum",
    cinemaName: "PVR Superplex (Forum Mall)",
    city: "Bengaluru",
    screenNumber: 2,
    showDate: "2026-10-28",
    startTime: "07:30 PM",
    ticketPrice: 400.00,
    totalSeats: 80,
    bookedSeats: ["E3", "E4", "F5"]
  },
  {
    _id: "shw_109",
    movieId: "mov_kantara",
    movieTitle: "Kantara: Legend of the Forest",
    cinemaId: "cin_blr_forum",
    cinemaName: "PVR Superplex (Forum Mall)",
    city: "Bengaluru",
    screenNumber: 3,
    showDate: "2026-10-28",
    startTime: "08:15 PM",
    ticketPrice: 320.00,
    totalSeats: 80,
    bookedSeats: ["G4", "G5", "G6"]
  },
  {
    _id: "shw_110",
    movieId: "mov_dangal",
    movieTitle: "Dangal",
    cinemaId: "cin_del_select",
    cinemaName: "PVR Directors Cut (Vasant Kunj)",
    city: "Delhi",
    screenNumber: 1,
    showDate: "2026-10-28",
    startTime: "01:15 PM",
    ticketPrice: 300.00,
    totalSeats: 80,
    bookedSeats: ["B3", "B4"]
  }
]);

// 5. Insert Sample Bookings for Indian Movies
db.bookings.insertMany([
  {
    bookingId: "MM-BKG-10001",
    userId: "1", // Corresponds to MySQL user John Doe (ID 1)
    userEmail: "john.doe@example.com",
    userName: "John Doe",
    showtimeId: "shw_101",
    movieTitle: "Kalki 2898 AD",
    moviePoster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    cinemaName: "PVR INOX Gold (Palladium)",
    cinemaAddress: "Phoenix Palladium, Senapati Bapat Marg, Lower Parel",
    screenNumber: 1,
    showDate: "2026-10-28",
    startTime: "10:30 AM",
    seats: ["A3", "A4"],
    seatCount: 2,
    ticketPrice: 350.00,
    convenienceFee: 50.00,
    totalAmount: 750.00,
    status: "CONFIRMED",
    bookingTimestamp: new Date().toISOString()
  },
  {
    bookingId: "MM-BKG-10002",
    userId: "1",
    userEmail: "john.doe@example.com",
    userName: "John Doe",
    showtimeId: "shw_104",
    movieTitle: "RRR: Rise Roar Revolt",
    moviePoster: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80",
    cinemaName: "Prasads Multiplex (IMAX Screen)",
    cinemaAddress: "NTR Gardens, Khairatabad",
    screenNumber: 1,
    showDate: "2026-10-28",
    startTime: "11:00 AM",
    seats: ["A1", "A2"],
    seatCount: 2,
    ticketPrice: 300.00,
    convenienceFee: 50.00,
    totalAmount: 650.00,
    status: "CONFIRMED",
    bookingTimestamp: new Date().toISOString()
  }
]);

print("MovieMate MongoDB sample data initialized successfully!");
