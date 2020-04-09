package com.mounach.cinema.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "theater")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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

    @OneToMany(mappedBy = "theater", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Session> sessions;


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

    public UUID getId() {
        return id;
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

    public List<Session> getSessions() {
        return sessions;
    }

    public void setSessions(List<Session> sessions) {
        this.sessions = sessions;
    }

}
