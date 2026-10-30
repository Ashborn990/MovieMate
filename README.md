# MovieMate – Full-Stack Movie Ticket Booking Application

MovieMate is a full-stack movie ticket booking web application built using React.js, Java Spring Boot, MySQL and MongoDB.

The application allows users to browse movies, explore cinemas, view showtimes, select seats, book tickets and view their booking history.

It is designed as a learning project and demonstrates frontend development, REST API integration, backend business logic, database connectivity and session-based authentication.

---

## 1. Project Overview

MovieMate follows a client-server architecture.

The React frontend communicates with the Spring Boot backend through REST APIs. The backend processes requests, applies business rules and interacts with two databases.

### Main Features

- User registration and login
- Password encryption using BCrypt
- Session-based authentication
- Browse movies and movie details
- Search and filter movies
- Browse cinemas by city
- View available showtimes
- Interactive cinema seat selection
- Dynamic ticket price calculation
- Book multiple seats
- Prevent duplicate seat reservations
- View personal booking history
- View booking details and print tickets
- Responsive user interface

---

## 2. Application Architecture

```text
                 USER
                  |
                  v
          React Frontend
          (Vite - Port 5173)
                  |
                  | Fetch API
                  | HTTP Requests
                  v
         Spring Boot Backend
          (Port 8080)
                  |
          +-------+-------+
          |               |
          v               v
      MySQL Database   MongoDB Database
          |               |
       User Accounts   Movies
                       Cinemas
                       Showtimes
                       Bookings
```

### Frontend

The frontend is responsible for:
- Displaying application pages and components.
- Managing user interactions.
- Handling form validation.
- Managing application state.
- Sending API requests to the backend.
- Displaying movie, cinema, seat and booking information.

### Backend

The backend is responsible for:
- Processing HTTP requests.
- Validating user input.
- Managing user sessions.
- Encrypting passwords.
- Applying booking business rules.
- Communicating with databases.
- Returning API responses to the frontend.

### Database Design

MovieMate uses two databases for different purposes.

**MySQL – User Management**

MySQL stores user account information in a relational table.

Example information:
- User ID
- Full name
- Email
- Encrypted password

**MongoDB – Movie and Booking Management**

MongoDB stores:
- Movies
- Cinemas
- Showtimes
- Booked seat information
- Booking records

A booking document stores the user's relational database ID as `userId`. This links a booking to its owner without requiring a cross-database foreign key.

---

## 3. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React.js | User interface |
| Frontend | React Router | Client-side navigation |
| Frontend | HTML5 and CSS3 | Structure and styling |
| Frontend | JavaScript | Application logic |
| Frontend | Fetch API | Backend communication |
| Frontend | Vite | Development server and build tool |
| Backend | Java 17+ | Backend programming |
| Backend | Spring Boot | Application framework |
| Backend | Spring Web | REST API development |
| Backend | Spring JDBC | MySQL operations |
| Backend | Spring Data MongoDB | MongoDB operations |
| Backend | Spring Security | Security configuration |
| Security | BCrypt | Password hashing |
| Authentication | HTTP Sessions | User session management |
| Database | MySQL | User accounts |
| Database | MongoDB | Movies, cinemas, showtimes and bookings |
| Build Tool | Maven | Backend dependency management |
| Package Manager | npm | Frontend dependency management |

---

## 4. Project Folder Structure

The following is a logical overview of the application. Keep the names synchronized with the actual files in your repository.

```text
moviemate/
│
├── backend/
│   ├── pom.xml
│   │
│   └── src/
│       └── main/
│           ├── java/com/moviemate/
│           │   │
│           │   ├── MovieMateApplication.java
│           │   │
│           │   ├── config/
│           │   │   ├── SecurityConfig.java
│           │   │   └── DataInitializer.java
│           │   │
│           │   ├── controller/
│           │   │   ├── AuthController.java
│           │   │   ├── MovieController.java
│           │   │   ├── CinemaController.java
│           │   │   ├── ShowtimeController.java
│           │   │   └── BookingController.java
│           │   │
│           │   ├── model/
│           │   │   ├── User.java
│           │   │   ├── Movie.java
│           │   │   ├── Cinema.java
│           │   │   ├── Showtime.java
│           │   │   ├── Booking.java
│           │   │   ├── Seat.java
│           │   │   └── dto/
│           │   │
│           │   ├── repository/
│           │   │   ├── UserRepository.java
│           │   │   ├── MovieRepository.java
│           │   │   ├── CinemaRepository.java
│           │   │   ├── ShowtimeRepository.java
│           │   │   └── BookingRepository.java
│           │   │
│           │   └── service/
│           │       ├── AuthService.java
│           │       ├── MovieService.java
│           │       ├── CinemaService.java
│           │       ├── ShowtimeService.java
│           │       └── BookingService.java
│           │
│           └── resources/
│               └── application.properties
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   │
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       │
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── MovieCard.jsx
│       │   ├── HeroBanner.jsx
│       │   ├── SeatGrid.jsx
│       │   └── TicketView.jsx
│       │
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   ├── MoviesPage.jsx
│       │   ├── MovieDetailsPage.jsx
│       │   ├── CinemasPage.jsx
│       │   ├── SeatSelectionPage.jsx
│       │   ├── BookingConfirmationPage.jsx
│       │   ├── MyBookingsPage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── SignUpPage.jsx
│       │   └── FaqPage.jsx
│       │
│       ├── services/
│       │   └── api.js
│       │
│       ├── context/
│       │   └── AuthContext.jsx
│       │
│       └── styles/
│           ├── Navbar.css
│           ├── Footer.css
│           ├── MovieCard.css
│           ├── HeroBanner.css
│           ├── SeatGrid.css
│           ├── Ticket.css
│           └── Pages.css
│
├── database/
│   ├── mysql_schema.sql
│   └── mongodb_sample_data.js
│
└── README.md
```

---

## 5. Prerequisites

Install the following software before running the application:

1. Java JDK 17 or later
2. Apache Maven
3. Node.js and npm
4. MySQL Server
5. MongoDB Server or MongoDB Atlas account
6. Git (optional, for cloning the repository)
7. An IDE such as IntelliJ IDEA or VS Code

---

## 6. Installation and Setup

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project:

```bash
cd moviemate
```

### Step 2: Configure MySQL

Start your MySQL server.

Open MySQL Workbench or the MySQL terminal and execute the database script:

```sql
SOURCE path/to/moviemate/database/mysql_schema.sql;
```

This script is intended to create the user database and required table structure.

Verify the database and table names against the SQL script.

### Step 3: Configure MongoDB

Start your MongoDB server or create a MongoDB Atlas database.

If using the supplied sample data script, run:

```bash
mongosh "mongodb://localhost:27017/moviemate" database/mongodb_sample_data.js
```

The backend may also initialize sample movie, cinema and showtime data through `DataInitializer.java`.

Check the initializer before running both approaches to avoid duplicate sample records.

### Step 4: Configure Backend Properties

Open:

```text
backend/src/main/resources/application.properties
```

Configure the database connections:

```properties
server.port=8080

spring.datasource.url=jdbc:mysql://localhost:3306/moviemate_users?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.data.mongodb.uri=mongodb://localhost:27017/moviemate
```

Replace the database credentials with your own values.

For MongoDB Atlas, use your Atlas connection URI instead of the local MongoDB URI.

Do not commit real database passwords or connection credentials to GitHub.

### Step 5: Run the Backend

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Run:

```bash
mvn spring-boot:run
```

The backend should start at:

```text
http://localhost:8080
```

### Step 6: Run the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application:

```text
http://localhost:5173
```

---

## 7. Frontend and Backend Communication

MovieMate uses the browser's Fetch API to communicate with the Spring Boot backend.

The frontend API service is located at:

```text
frontend/src/services/api.js
```

The base API path is:

```javascript
const API_BASE_URL = '/api';
```

The common API wrapper handles:
- HTTP requests.
- JSON request headers.
- Session cookies.
- Response parsing.
- HTTP error handling.

Example:

```javascript
const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    credentials: 'include'
});
```

The `credentials: 'include'` option allows browser requests to send session cookies.

The Vite development server forwards `/api` requests to the Spring Boot backend running on port 8080.

---

## 8. Authentication and Session Management

MovieMate uses HTTP session-based authentication.

### Registration

1. User enters registration information.
2. React sends a POST request to `/api/auth/signup`.
3. Spring Boot validates the information.
4. The password is hashed using BCrypt.
5. User details are saved in MySQL.
6. A session is created and user information is stored in the session.

### Login

1. User enters email and password.
2. React sends a POST request to `/api/auth/login`.
3. The backend retrieves the account from MySQL.
4. BCrypt verifies the entered password against the stored hash.
5. On successful login, the backend creates or updates the HTTP session.
6. The browser retains the session cookie.

### Logout

The logout endpoint invalidates the current session.

### Current User

The `/api/auth/me` endpoint checks the existing session and returns the logged-in user's profile.

The backend uses session attributes such as:

```java
session.setAttribute("USER_ID", user.getId());
session.setAttribute("USER_EMAIL", user.getEmail());
```

The booking functionality uses the session's `USER_ID` to identify the user.

---

## 9. Movie Ticket Booking Workflow

The booking process involves the frontend, backend and MongoDB.

### Step 1: Browse Movies

The frontend requests movie information from:

```http
GET /api/movies
```

The backend retrieves movie documents from MongoDB and returns the results.

### Step 2: Select a Movie and Showtime

The user opens a movie details page and selects a cinema, date and showtime.

The frontend retrieves the relevant showtime information.

### Step 3: Display Seat Layout

The frontend requests:

```http
GET /api/showtimes/{id}/seats
```

The backend generates an 8-row, 10-column seat layout.

It checks the show's `bookedSeats` array in MongoDB to determine which seats are already reserved.

The frontend displays seat states:

- Available
- Selected
- Booked

Already-booked seats should not be selectable.

### Step 4: Select Seats

The user selects available seats.

React manages the selected seat information and calculates the total ticket price.

The application supports a maximum of 8 seats per booking.

### Step 5: Confirm Booking

The frontend sends:

```http
POST /api/bookings
```

Example request:

```json
{
  "showtimeId": "YOUR_SHOWTIME_ID",
  "seats": ["A1", "A2"]
}
```

The backend:
1. Checks the authenticated session.
2. Validates the requested seats.
3. Retrieves the selected showtime.
4. Checks whether the requested seats are already booked.
5. Attempts an atomic MongoDB update to reserve the seats.
6. Creates and saves the booking record.
7. Returns the booking information.

### Step 6: Booking Confirmation

After successful booking, the frontend displays the confirmation page with ticket details.

The ticket includes information such as:
- Booking reference
- Movie
- Cinema
- Showtime
- Selected seats
- Total price

Users can print the ticket through the browser's print functionality.

---

## 10. Preventing Duplicate Seat Reservations

One important challenge in a movie booking application is preventing two users from booking the same seat.

For example:

- User A selects seat B3.
- User B also selects seat B3.
- Both users attempt to confirm their bookings.

If the backend only checks availability before saving, both users might pass the initial check.

MovieMate uses MongoDB's atomic single-document update to protect the seat reservation operation.

Conceptually, the backend executes:

```java
Query query = new Query(
    Criteria.where("_id").is(showtimeId)
        .and("bookedSeats").nin(requestedSeats)
);

Update update = new Update()
    .push("bookedSeats")
    .each(requestedSeats.toArray());

UpdateResult result =
    mongoTemplate.updateFirst(query, update, Showtime.class);
```

The query checks that the requested seats are not already present in `bookedSeats`.

MongoDB performs the update atomically on the individual showtime document.

If another user has already reserved one of the requested seats, the query no longer matches and the reservation attempt fails.

**Important:** Atomic seat reservation protects against competing seat updates. It does not automatically make the complete workflow (seat reservation, booking creation and any rollback) one database transaction. The application uses compensation logic if a later booking operation fails.

---

## 11. REST API Reference

### Authentication APIs

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/auth/signup` | POST | Register a new user |
| `/api/auth/login` | POST | Authenticate a user |
| `/api/auth/logout` | POST | End the current session |
| `/api/auth/me` | GET | Retrieve the current user |

### Movie APIs

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/movies` | GET | Retrieve movies |
| `/api/movies/{id}` | GET | Retrieve movie details |
| `/api/movies/genres` | GET | Retrieve available genres |
| `/api/movies/languages` | GET | Retrieve available languages |

### Cinema APIs

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/cinemas` | GET | Retrieve cinemas |
| `/api/cinemas/{id}` | GET | Retrieve cinema details |
| `/api/cinemas/cities` | GET | Retrieve available cities |

### Showtime APIs

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/showtimes` | GET | Retrieve showtimes |
| `/api/showtimes/{id}` | GET | Retrieve showtime details |
| `/api/showtimes/{id}/seats` | GET | Retrieve seat layout and availability |

### Booking APIs

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/bookings` | POST | Create a booking |
| `/api/bookings/my` | GET | Retrieve current user's bookings |
| `/api/bookings/{id}` | GET | Retrieve an individual booking |

**Authentication note:** The booking endpoints use manual HTTP session validation in the application controller/service. Spring Security's current booking matcher is configured with `permitAll()`, so the actual session check must not be removed or bypassed.

---

## 12. Manual Testing Guide

The following scenarios can be tested through the browser or an API client such as Postman.

### Authentication Testing

1. Register a new user.
2. Attempt to register again with the same email.
3. Log in with valid credentials.
4. Attempt login with an incorrect password.
5. Refresh the page after login.
6. Log out.
7. Try to access personal booking information after logout.

### Movie and Showtime Testing

1. Open the home page.
2. Browse the movie catalogue.
3. Search for a movie.
4. Filter by genre or language.
5. Open movie details.
6. Select a cinema and showtime.
7. View the seat layout.

### Booking Testing

1. Select one available seat and book it.
2. Open the same showtime again and verify that the seat appears booked.
3. Try booking the same seat from another user session.
4. Select more than 8 seats and verify that the request is rejected.
5. Select an invalid seat identifier and verify validation.
6. Open My Bookings and verify the booking history.
7. Open a booking and verify the ticket information.

### Postman Session Testing

For session-based authentication:

1. Enable the Postman Cookie Jar.
2. Call `POST /api/auth/login`.
3. Confirm that the response establishes a session cookie.
4. Call `GET /api/auth/me`.
5. Call `POST /api/bookings` while logged in.
6. Call `POST /api/auth/logout`.
7. Attempt a booking request again.

An unauthenticated booking request should be rejected by the backend's session validation.

---

## 13. Security Considerations

MovieMate includes several basic security mechanisms:

- BCrypt password hashing.
- HTTP session-based authentication.
- Session ID rotation after authentication.
- Backend validation of booking requests.
- User ownership checks when retrieving personal bookings.
- Atomic seat reservation to prevent duplicate reservations.

**Production considerations:**

The current project is a learning implementation, not a production-hardened ticketing platform.

Before deployment, review:
- CSRF protection for cookie-based authentication.
- HTTPS and secure cookie settings.
- Session cookie configuration.
- Authorization enforcement.
- Database credentials and environment variables.
- MongoDB transaction and failure-recovery strategy.
- Rate limiting and request validation.
- Logging and error handling.

---

## 14. Future Improvements

Possible enhancements include:

- Automated backend unit and integration tests.
- Automated frontend tests.
- Real-time seat availability using WebSockets.
- Payment gateway integration.
- Email booking confirmations.
- Admin dashboard for managing movies and cinemas.
- Booking cancellation and refund management.
- Better monitoring and error logging.
- Deployment using cloud infrastructure.

These are potential future enhancements and are not necessarily part of the current implementation.

---

## 15. Learning Outcomes

Working on MovieMate provides practical experience with:

- React components, hooks and state management.
- React Router and client-side navigation.
- Fetch API and REST communication.
- Java and Spring Boot application development.
- Controller-Service-Repository architecture.
- MySQL database connectivity using JDBC.
- MongoDB document storage.
- Password hashing and session management.
- Input validation and exception handling.
- Atomic database updates.
- Full-stack application integration.

---

## 16. License

This project is developed for educational, academic and portfolio demonstration purposes.

---

**MovieMate – Browse Movies. Choose Seats. Book Tickets.**