package com.dev.PokeAPI.controller;

import com.dev.PokeAPI.domain.UserLogin;
import com.dev.PokeAPI.repositories.UserLoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.security.Principal;

@ControllerAdvice
@RequiredArgsConstructor
public class GlobalController {

    @Autowired
    private UserLoginRepository repo;

    @ModelAttribute("user")
    public UserLogin getProfile(Principal principal) {

        if (principal == null) {
            return null;
        }

        String username = principal.getName();

        return repo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
