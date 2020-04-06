package com.mounach.cinema.api;

import com.mounach.cinema.model.Theater;
import com.mounach.cinema.model.Ticket;
import com.mounach.cinema.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequestMapping("ticket")
@RestController
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    private @ResponseBody
    Iterable<Ticket> getAllTicket() {
        return ticketService.getAllTickets();
    }

    @GetMapping("{id}")
    private @ResponseBody Ticket getOneTicket(@PathVariable("id") UUID id) {
        return ticketService.getOneTicket(id);
    }

    @PostMapping
    private @ResponseBody Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.createTicket(ticket);
    }

}
