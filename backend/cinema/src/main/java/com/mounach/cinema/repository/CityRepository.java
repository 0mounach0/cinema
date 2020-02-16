package com.mounach.cinema.repository;

import com.mounach.cinema.model.Cinema;
import com.mounach.cinema.model.City;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface CityRepository extends CrudRepository<City, UUID> {
}
