package com.mounach.proxy.api;

import com.mounach.proxy.model.User;
import com.mounach.proxy.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RequestMapping("user")
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

    @GetMapping
    private @ResponseBody
    String getUser(Authentication authentication) {
        try {
            String username = authentication.getName();
            User user = customUserDetailsService.getUser(username);

            return "{" +
                    "\"status\": \"LOGGED\"," +
                    "\"username\": \"" + user.getUsername() + "\"," +
                    "\"email\": \"" + user.getEmail() + "\"," +
                    "\"role\": \"" + user.getRole() + "\"," +
                    "\"firstname\": \"" + user.getFirstname() + "\"," +
                    "\"lastname\": \"" + user.getLastname() + "\"," +
                    "\"active\": " + user.getActive() +
                    "}";

        } catch (NullPointerException err){
            return "{" +
                    "\"status\": \"ERROR\"" +
                    "}";
        }

    }

}
