package com.mounach.cinema.service;

import com.mounach.cinema.model.City;
import com.mounach.cinema.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CityService {

    @Autowired
    private CityRepository cityRepository;

    public Iterable<City> getAllCities() {
        return cityRepository.findAll();
    }

    public City getOneCity(UUID id) {

        return cityRepository.findById(id).get();
    }

    public City createCity(City city) {
        return cityRepository.save(city);
    }

    public City deleteCity(UUID id) {
        City city = cityRepository.findById(id).get();
        cityRepository.deleteById(id);
        return city;
    }

    public City updateCity(UUID id, City c) {
        City city = cityRepository.findById(id).get();
        city.setName(c.getName());
        cityRepository.save(city);
        return city;
    }

}
