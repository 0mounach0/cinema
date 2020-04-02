package com.mounach.movies.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/movie")
public class MovieController {

    @Value("${api.key}")
    private String apiKey;

    @GetMapping("search/{query}")
    private @ResponseBody
    Optional searchMovie(@PathVariable("query") String query) {

        final String uri = "https://api.themoviedb.org/3/search/movie?api_key="
                + this.apiKey +"&language=en-US&query=" + query;

        RestTemplate restTemplate = new RestTemplate();
        Optional result = restTemplate.getForObject(uri, Optional.class);

        return result;
    }

    @GetMapping("{id}")
    private @ResponseBody
    Optional getMovie(@PathVariable("id") int id) {

        final String uri = "https://api.themoviedb.org/3/movie/" + id + "?api_key="
                + this.apiKey +"&language=en-US";

        RestTemplate restTemplate = new RestTemplate();
        Optional result = restTemplate.getForObject(uri, Optional.class);

        return result;
    }

}
