package com.mounach.cinema.api;

import com.mounach.cinema.model.Cinema;
import com.mounach.cinema.model.City;
import com.mounach.cinema.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequestMapping("city")
@RestController
public class CityController {

    private CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }


    @GetMapping
    private @ResponseBody
    Iterable<City> getAllCities() {
        return cityService.getAllCities();
    }

    @GetMapping("{id}")
    private @ResponseBody City getOneCity(@PathVariable("id") UUID id) {
        return cityService.getOneCity(id);
    }

    @PostMapping
    private @ResponseBody City createCity(@RequestBody City City) {
        return cityService.createCity(City);
    }

    @DeleteMapping("{id}")
    private @ResponseBody City deleteCity(@PathVariable("id") UUID id) {
        return cityService.deleteCity(id);
    }

    @PutMapping("{id}")
    private @ResponseBody City updateCity(@PathVariable("id") UUID id, @RequestBody City city) {
        return cityService.updateCity(id, city);
    }


}
