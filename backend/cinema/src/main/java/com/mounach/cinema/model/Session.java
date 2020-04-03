package com.mounach.cinema.model;

import com.fasterxml.jackson.annotation.*;
import com.sun.istack.NotNull;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "session")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Session implements Serializable {

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
    private int movie_id;

    @Column
    @NotNull
    private String original_title;

    @Column(columnDefinition="LONGTEXT")
    @NotNull
    private String overview;

    @Column
    @NotNull
    private String poster_path;

    @Column
    @NotNull
    private String release_date;

    @Column
    @NotNull
    private String status;

    @Column
    @NotNull
    private String title;

    @Column
    @NotNull
    private String vote_average;

    @Column
    @NotNull
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime start_date;

    @Column
    @NotNull
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime end_date;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "theater_id", nullable = false)
    @JsonManagedReference
    private Theater theater;

    @OneToMany(mappedBy = "session", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Ticket> tickets;

    public Session(
            @JsonProperty("original_title") String original_title,
            @JsonProperty("overview") String overview,
            @JsonProperty("poster_path") String poster_path,
            @JsonProperty("release_date") String release_date,
            @JsonProperty("status") String status,
            @JsonProperty("title") String title,
            @JsonProperty("vote_average") String vote_average,
            @JsonProperty("movie_id") int movie_id,
            @JsonProperty("start_date") LocalDateTime start_date,
            @JsonProperty("end_date") LocalDateTime end_date,
            @JsonProperty("theater") Theater theater) {
        this.original_title = original_title;
        this.overview = overview;
        this.poster_path = poster_path;
        this.release_date = release_date;
        this.status = status;
        this.title = title;
        this.vote_average = vote_average;
        this.movie_id = movie_id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.theater = theater;
    }

    public Session() {
    }

    public UUID getId() {
        return id;
    }

    public int getMovie_id() {
        return movie_id;
    }

    public void setMovie_id(int movie_id) {
        this.movie_id = movie_id;
    }

    public Theater getTheater() {
        return theater;
    }

    public void setTheater(Theater theater) {
        this.theater = theater;
    }

    public LocalDateTime getStart_date() {
        return start_date;
    }

    public void setStart_date(LocalDateTime start_date) {
        this.start_date = start_date;
    }

    public LocalDateTime getEnd_date() {
        return end_date;
    }

    public void setEnd_date(LocalDateTime end_date) {
        this.end_date = end_date;
    }

    public String getOriginal_title() {
        return original_title;
    }

    public void setOriginal_title(String original_title) {
        this.original_title = original_title;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getPoster_path() {
        return poster_path;
    }

    public void setPoster_path(String poster_path) {
        this.poster_path = poster_path;
    }

    public String getRelease_date() {
        return release_date;
    }

    public void setRelease_date(String release_date) {
        this.release_date = release_date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getVote_average() {
        return vote_average;
    }

    public void setVote_average(String vote_average) {
        this.vote_average = vote_average;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    @Override
    public String toString() {
        return "Session{" +
                "id=" + id +
                ", movie_id=" + movie_id +
                ", original_title='" + original_title + '\'' +
                ", overview='" + overview + '\'' +
                ", poster_path='" + poster_path + '\'' +
                ", release_date='" + release_date + '\'' +
                ", status='" + status + '\'' +
                ", title='" + title + '\'' +
                ", vote_average='" + vote_average + '\'' +
                ", start_date=" + start_date +
                ", end_date=" + end_date +
                ", theater=" + theater +
                ", tickets=" + tickets +
                '}';
    }
}
