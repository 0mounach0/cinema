package com.mounach.cinema.api;

import com.mounach.cinema.model.Cinema;
import com.mounach.cinema.service.CinemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/cinema")
@RestController
public class CinemaController {

    private final CinemaService cinemaService;

    @Autowired
    public CinemaController(CinemaService cinemaService) {
        this.cinemaService = cinemaService;
    }

    @PostMapping
    private void insertCinema(@RequestBody Cinema cinema) {
        cinemaService.insertCinema(cinema);
    }

    @GetMapping
    private List<Cinema> getAllCinemas() {
        return cinemaService.getAllCinemas();
    }

    @DeleteMapping("{id}")
    private void deleteCinemas(@PathVariable("id") UUID id) {
        cinemaService.deleteCinema(id);
    }

}
