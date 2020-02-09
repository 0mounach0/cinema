package com.mounach.cinema.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class Cinema {

    private final UUID id;
    private String name;
    private double longitude;
    private double latitute;

    public Cinema(@JsonProperty("id") UUID id,
                  @JsonProperty("name") String name,
                  @JsonProperty("longitude") double longitude,
                  @JsonProperty("latitude") double latitute) {
        this.id = id;
        this.name = name;
        this.longitude = longitude;
        this.latitute = latitute;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitute() {
        return latitute;
    }

    public void setLatitute(double latitute) {
        this.latitute = latitute;
    }

    @Override
    public String toString() {
        return "Cinema{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", longitude=" + longitude +
                ", latitute=" + latitute +
                '}';
    }
}
