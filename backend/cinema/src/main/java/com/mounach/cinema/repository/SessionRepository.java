package com.mounach.cinema.repository;

import com.mounach.cinema.model.Cinema;
import com.mounach.cinema.model.Session;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface SessionRepository extends CrudRepository<Session, UUID> {
    Iterable<Session> findByTheater_Cinema(Cinema cinema);
}
