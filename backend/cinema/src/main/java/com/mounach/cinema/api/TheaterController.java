package com.mounach.cinema.api;

import com.mounach.cinema.model.Cinema;
import com.mounach.cinema.model.Theater;
import com.mounach.cinema.service.TheaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequestMapping("theater")
@RestController
public class TheaterController {

    private final TheaterService theaterService;

    @Autowired
    public TheaterController(TheaterService theaterService) {
        this.theaterService = theaterService;
    }

    @GetMapping
    private @ResponseBody
    Iterable<Theater> getAllTheaters() {
        return theaterService.getAllTheaters();
    }

    @GetMapping("{id}")
    private @ResponseBody Theater getOneTheater(@PathVariable("id") UUID id) {
        return theaterService.getOneTheater(id);
    }

    @PostMapping
    private @ResponseBody Theater createTheater(@RequestBody Theater theater) {
        return theaterService.createTheater(theater);
    }

    @DeleteMapping("{id}")
    private @ResponseBody Theater deleteTheater(@PathVariable("id") UUID id) {
        return theaterService.deleteTheater(id);
    }

    @PutMapping("{id}")
    private @ResponseBody Theater updateTheater(@PathVariable("id") UUID id, @RequestBody Theater theater) {
        return theaterService.updateTheater(id, theater);
    }

}
