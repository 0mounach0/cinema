package com.mounach.cinema.repository;

import com.mounach.cinema.model.Cinema;
import com.mounach.cinema.model.Theater;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface TheaterRepository extends CrudRepository<Theater, UUID> {

}
