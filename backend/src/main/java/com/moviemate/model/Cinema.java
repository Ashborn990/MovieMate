package com.moviemate.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Cinema Hall Document for MongoDB (moviemate.cinemas)
 */
@Document(collection = "cinemas")
public class Cinema {

    @Id
    private String id;
    private String name;
    private String city;
    private String address;
    private int screens;
    private String priceRange;

    public Cinema() {}

    public Cinema(String id, String name, String city, String address, int screens, String priceRange) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.address = address;
        this.screens = screens;
        this.priceRange = priceRange;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getScreens() {
        return screens;
    }

    public void setScreens(int screens) {
        this.screens = screens;
    }

    public String getPriceRange() {
        return priceRange;
    }

    public void setPriceRange(String priceRange) {
        this.priceRange = priceRange;
    }
}
