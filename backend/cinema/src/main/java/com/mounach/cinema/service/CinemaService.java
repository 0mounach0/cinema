package com.mounach.cinema.service;

import com.mounach.cinema.doa.CinemaDao;
import com.mounach.cinema.model.Cinema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CinemaService {

    private final CinemaDao cinemaDao;

    @Autowired
    public CinemaService(@Qualifier("postgres") CinemaDao cinemaDao) {
        this.cinemaDao = cinemaDao;
    }

    public int insertCinema(Cinema cinema) {
        UUID idTmp = null;
        UUID newId = Optional.ofNullable(idTmp)
                .orElse(UUID.randomUUID());
        return cinemaDao.insertCinema(newId, cinema);
    }

    public List<Cinema> getAllCinemas() {
        return cinemaDao.getAllCinemas();
    }

}
