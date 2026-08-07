package com.dev.PokeAPI.controller;

import com.dev.PokeAPI.domain.UserLogin;
import com.dev.PokeAPI.repositories.UserLoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final UserLoginRepository repo;

    @GetMapping
    public String getProfile(Model model, Principal principal) {
        String username = principal.getName();

        UserLogin user = repo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        model.addAttribute("user", user);

        return "profile";
    }


}
