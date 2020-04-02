package com.mounach.cinema.service;

import com.mounach.cinema.model.Cinema;
import com.mounach.cinema.model.Session;
import com.mounach.cinema.model.Theater;
import com.mounach.cinema.repository.CinemaRepository;
import com.mounach.cinema.repository.SessionRepository;
import com.mounach.cinema.repository.TheaterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private CinemaRepository cinemaRepository;

    public Iterable<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    public Session createSession(Session session) {
        return sessionRepository.save(session);
    }

    public Session getOneSession(UUID id) {
        return sessionRepository.findById(id).get();
    }

    public Session deleteSession(UUID id) {
        Session session = sessionRepository.findById(id).get();
        sessionRepository.deleteById(id);
        return session;
    }

    public Session updateSession(UUID id, Session s) {
        Session session = sessionRepository.findById(id).get();
        session.setName(s.getName());
        session.setTheater(s.getTheater());
        session.setMovie_id(s.getMovie_id());
        session.setStart_date(s.getStart_date());
        session.setEnd_date(s.getEnd_date());
        sessionRepository.save(session);
        return session;
    }

    public Iterable<Session> getCinemaSessions(UUID id) {
        Cinema cinema = cinemaRepository.findById(id).get();
        Iterable<Session> sessions = sessionRepository.findByTheater_Cinema(cinema);
        return sessions;
    }

}
