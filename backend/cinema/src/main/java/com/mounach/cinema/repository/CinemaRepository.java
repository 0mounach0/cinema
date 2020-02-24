package com.mounach.cinema.repository;

import com.mounach.cinema.model.Cinema;
import org.springframework.data.repository.CrudRepository;
import sun.jvm.hotspot.debugger.Page;

import java.awt.print.Pageable;
import java.util.UUID;

public interface CinemaRepository extends CrudRepository<Cinema, UUID> {

}