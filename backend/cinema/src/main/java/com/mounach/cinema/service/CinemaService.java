package com.mounach.cinema.service;

import com.mounach.cinema.model.Cinema;
import com.mounach.cinema.repository.CinemaRepository;
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
        cinema.setLongitude(c.getLongitude());
        cinema.setLatitude(c.getLatitude());
        cinemaRepository.save(cinema);
        return cinema;
    }

}
