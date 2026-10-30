package com.moviemate.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Movie Document for MongoDB (moviemate.movies)
 */
@Document(collection = "movies")
public class Movie {

    @Id
    private String id;
    private String title;
    private String description;
    private String genre;
    private String language;
    private String duration;
    private String releaseDate;
    private double rating;
    private String posterUrl;
    private String bannerUrl;
    private String status; // NOW_SHOWING, UPCOMING
    private boolean isPopular;

    public Movie() {}

    public Movie(String id, String title, String description, String genre, String language,
                 String duration, String releaseDate, double rating, String posterUrl,
                 String bannerUrl, String status, boolean isPopular) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.genre = genre;
        this.language = language;
        this.duration = duration;
        this.releaseDate = releaseDate;
        this.rating = rating;
        this.posterUrl = posterUrl;
        this.bannerUrl = bannerUrl;
        this.status = status;
        this.isPopular = isPopular;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public String getBannerUrl() {
        return bannerUrl;
    }

    public void setBannerUrl(String bannerUrl) {
        this.bannerUrl = bannerUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isPopular() {
        return isPopular;
    }

    public void setPopular(boolean popular) {
        isPopular = popular;
    }
}
