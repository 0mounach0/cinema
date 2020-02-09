package com.mounach.cinema.doa;

import com.mounach.cinema.model.Cinema;

import java.util.List;
import java.util.UUID;

public interface CinemaDao {

    int insertCinema(UUID id, Cinema cinema);

    int deleteCinema(UUID id);

    List<Cinema> getAllCinemas();

}
