package com.mounach.cinema.service;

import com.mounach.cinema.model.Cinema;
import com.mounach.cinema.model.Session;
import com.mounach.cinema.model.Theater;
import com.mounach.cinema.repository.CinemaRepository;
import com.mounach.cinema.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class CinemaService {

    @Autowired
    private CinemaRepository cinemaRepository;

    public Iterable<Cinema> getAllCinemas() {
        return cinemaRepository.findAll();
    }

    public Cinema getOneCinema(UUID id) {
        return cinemaRepository.findById(id).get();
    }

    public Cinema createCinema(Cinema cinema) {
        return cinemaRepository.save(cinema);
    }

    public Cinema deleteCinema(UUID id) {
        Cinema cinema = cinemaRepository.findById(id).get();
        cinemaRepository.deleteById(id);
        return cinema;
    }

    public Cinema updateCinema(UUID id, Cinema c) {
        Cinema cinema = cinemaRepository.findById(id).get();
        cinema.setName(c.getName());
        cinema.setDescription(c.getDescription());
        cinema.setAddress(c.getAddress());
        cinema.setLongitude(c.getLongitude());
        cinema.setLatitude(c.getLatitude());
        cinema.setCity(c.getCity());
        cinemaRepository.save(cinema);
        return cinema;
    }

    public Iterable<Theater> getCinemaTheaters(UUID id) {
        Cinema cinema = cinemaRepository.findById(id).get();
        return cinema.getTheaters();
    }

}
