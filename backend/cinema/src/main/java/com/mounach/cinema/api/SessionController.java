package com.mounach.cinema.api;

import com.mounach.cinema.model.Session;
import com.mounach.cinema.model.Theater;
import com.mounach.cinema.service.SessionService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequestMapping("api/session")
@RestController
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping
    private @ResponseBody
    Iterable<Session> getAllSessions() {
        return sessionService.getAllSessions();
    }

    @GetMapping("{id}")
    private @ResponseBody Session getOneSession(@PathVariable("id") UUID id) {
        return sessionService.getOneSession(id);
    }

    @PostMapping
    private @ResponseBody Session createSession(@RequestBody Session session) {
        return sessionService.createSession(session);
    }

    @DeleteMapping("{id}")
    private @ResponseBody Session deleteSession(@PathVariable("id") UUID id) {
        return sessionService.deleteSession(id);
    }

    @PutMapping("{id}")
    private @ResponseBody Session updateSession(@PathVariable("id") UUID id, @RequestBody Session session) {
        return sessionService.updateSession(id, session);
    }

}
