package com.mounach.cinema.api;

import com.mounach.cinema.model.Cinema;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api")
@RestController
public class ApplicationSecurityController {

    @GetMapping("isLogged")
    private @ResponseBody
    String isLogged() {
        return "isLogged";
    }

    @GetMapping("isNotLogged")
    private @ResponseBody
    String isNotLogged() {
        return "isNotLogged";
    }

}
