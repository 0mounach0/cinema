package com.mounach.cinema.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "theater")
public class Theater implements Serializable {

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
    private int num_places;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cinema_id", nullable = false)
    @JsonManagedReference
    private Cinema cinema;


    public Theater() {
    }

    public Theater(
            @JsonProperty("name") String name,
            @JsonProperty("num_places") int num_places,
            @JsonProperty("cinema") Cinema cinema
    ) {
        this.name = name;
        this.num_places = num_places;
        this.cinema = cinema;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNum_places() {
        return num_places;
    }

    public void setNum_places(int num_places) {
        this.num_places = num_places;
    }

    public Cinema getCinema() {
        return cinema;
    }

    public void setCinema(Cinema cinema) {
        this.cinema = cinema;
    }
}
