package com.mounach.cinema.api;

import com.mounach.cinema.model.User;
import com.mounach.cinema.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/user")
@RestController
public class UserController {

    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    public UserController(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    @PostMapping
    private @ResponseBody
    User createUser(@RequestBody User user) {
        return customUserDetailsService.createUser(user);
    }

}
