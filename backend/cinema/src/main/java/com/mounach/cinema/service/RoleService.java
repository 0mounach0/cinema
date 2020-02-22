package com.mounach.cinema.service;

import com.mounach.cinema.model.City;
import com.mounach.cinema.model.Role;
import com.mounach.cinema.repository.CityRepository;
import com.mounach.cinema.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

}
