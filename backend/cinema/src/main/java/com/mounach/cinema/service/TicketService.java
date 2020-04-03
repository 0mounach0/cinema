package com.mounach.cinema.service;

import com.mounach.cinema.model.Theater;
import com.mounach.cinema.model.Ticket;
import com.mounach.cinema.repository.TheaterRepository;
import com.mounach.cinema.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public Iterable<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket createTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public Ticket getOneTicket(UUID id) {
        return ticketRepository.findById(id).get();
    }



}
