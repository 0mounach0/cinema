package com.mounach.cinema.model;

import com.fasterxml.jackson.annotation.*;
import com.mounach.cinema.repository.CinemaRepository;
import com.sun.istack.NotNull;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "cinema")
public class Cinema implements Serializable {

    @Id
    @Column(name = "id", updatable = false, nullable = false, unique=true, columnDefinition = "BINARY(16)")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID id;

    @Column
    @NotNull
    private String name;

    @Column
    @NotNull
    private double longitude;

    @Column
    @NotNull
    private double latitude;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "city_id", nullable = false)
    @JsonManagedReference
    private City city;

    public Cinema(@JsonProperty("name") String name,
                  @JsonProperty("longitude") double longitude,
                  @JsonProperty("latitude") double latitude,
                  @JsonProperty("city") City city) {
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
        this.city = city;
    }

    public Cinema() {
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

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

}
