package com.moviemate.model;

public class Seat {

    private String seatNumber; // e.g., "A1", "C5"
    private String row; // e.g., "A"
    private int column; // e.g., 1
    private String tier; // "Standard", "Premium", "VIP"
    private double price;
    private boolean isBooked;

    public Seat() {}

    public Seat(String seatNumber, String row, int column, String tier, double price, boolean isBooked) {
        this.seatNumber = seatNumber;
        this.row = row;
        this.column = column;
        this.tier = tier;
        this.price = price;
        this.isBooked = isBooked;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public String getRow() {
        return row;
    }

    public void setRow(String row) {
        this.row = row;
    }

    public int getColumn() {
        return column;
    }

    public void setColumn(int column) {
        this.column = column;
    }

    public String getTier() {
        return tier;
    }

    public void setTier(String tier) {
        this.tier = tier;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isBooked() {
        return isBooked;
    }

    public void setBooked(boolean booked) {
        isBooked = booked;
    }
}
