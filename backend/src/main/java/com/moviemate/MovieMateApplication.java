package com.moviemate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

/**
 * MovieMate – Movie Ticket Booking System
 * Main Spring Boot Application Entry Point
 * 
 * @ServletComponentScan enables detection of @WebServlet components
 * for our educational Java Servlet and JSP demonstration.
 */
@SpringBootApplication
@ServletComponentScan
public class MovieMateApplication {

    public static void main(String[] args) {
        SpringApplication.run(MovieMateApplication.class, args);
        System.out.println("=================================================");
        System.out.println("  MovieMate Backend is running on port 8080!");
        System.out.println("  REST API Base URL:  http://localhost:8080/api");
        System.out.println("=================================================");
    }
}
