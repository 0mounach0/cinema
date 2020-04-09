package com.mounach.cinema.service;

import com.mounach.cinema.model.Cinema;
import com.mounach.cinema.model.Session;
import com.mounach.cinema.model.Theater;
import com.mounach.cinema.model.Ticket;
import com.mounach.cinema.repository.CinemaRepository;
import com.mounach.cinema.repository.SessionRepository;
import com.mounach.cinema.repository.TheaterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
        session.setOriginal_title(s.getOriginal_title());
        session.setOverview(s.getOverview());
        session.setPoster_path(s.getPoster_path());
        session.setPrice(s.getPrice());
        session.setRelease_date(s.getRelease_date());
        session.setStatus(s.getStatus());
        session.setTitle(s.getTitle());
        session.setVote_average(s.getVote_average());
        session.setTheater(s.getTheater());
        session.setMovie_id(s.getMovie_id());
        session.setStartDate(s.getStartDate());
        session.setEndDate(s.getEndDate());
        sessionRepository.save(session);
        return session;
    }

    public Iterable<Session> getCinemaSessions(UUID id) {
        Cinema cinema = cinemaRepository.findById(id).get();
        Iterable<Session> sessions = sessionRepository.findByTheater_Cinema(cinema);
        return sessions;
    }

    public Iterable<Session> getCinemaSessions_byDate(UUID id, LocalDateTime start_date, LocalDateTime end_date) {
        Cinema cinema = cinemaRepository.findById(id).get();
        Iterable<Session> sessions = sessionRepository.findByTheater_CinemaAndStartDateBetween(cinema, start_date, end_date);
        return sessions;
    }

    public Iterable<Ticket> getSessionTickets(UUID id) {
        Session session = sessionRepository.findById(id).get();
        return session.getTickets();
    }

}
