package com.mounach.cinema.api;

import com.mounach.cinema.model.City;
import com.mounach.cinema.model.Role;
import com.mounach.cinema.service.CityService;
import com.mounach.cinema.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/role")
@RestController
public class RoleController {

    private RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping
    private @ResponseBody
    Role createRole(@RequestBody Role role) {
        return roleService.createRole(role);
    }

}
