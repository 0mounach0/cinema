package com.mounach.cinema.api;

import com.mounach.cinema.model.Cinema;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

//@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api")
@RestController
public class ApplicationSecurityController {



    @GetMapping(path="isLogged", produces = MediaType.APPLICATION_JSON_VALUE)
    private @ResponseBody()
    String isLogged() {
        return "{" +
                "\"status\": \"isLogged\"" +
                "}";
    }

    @GetMapping(path = "isNotLogged", produces = MediaType.APPLICATION_JSON_VALUE)
    private @ResponseBody
    String isNotLogged() {

        return "{" +
                "\"status\": \"isNotLogged\"" +
                "}";
    }

}
