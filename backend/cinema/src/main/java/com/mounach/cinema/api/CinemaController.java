package com.mounach.cinema.api;

import com.mounach.cinema.model.Cinema;
import com.mounach.cinema.service.CinemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

//@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/cinema")
@RestController
public class CinemaController {

    private final CinemaService cinemaService;

    @Autowired
    public CinemaController(CinemaService cinemaService) {
        this.cinemaService = cinemaService;
    }


    @GetMapping
    private @ResponseBody Iterable<Cinema> getAllCinemas() {
        return cinemaService.getAllCinemas();
    }

    @GetMapping("{id}")
    private @ResponseBody Cinema getOneCinema(@PathVariable("id") UUID id) {
        return cinemaService.getOneCinema(id);
    }

    @PostMapping
    private @ResponseBody Cinema createCinema(@RequestBody Cinema cinema) {
        return cinemaService.createCinema(cinema);
    }

    @DeleteMapping("{id}")
    private @ResponseBody Cinema deleteCinema(@PathVariable("id") UUID id) {
        return cinemaService.deleteCinema(id);
    }

    @PutMapping("{id}")
    private @ResponseBody Cinema updateCinema(@PathVariable("id") UUID id, @RequestBody Cinema cinema) {
        return cinemaService.updateCinema(id, cinema);
    }

}
