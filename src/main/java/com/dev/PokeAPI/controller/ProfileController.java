package com.dev.PokeAPI.controller;

import com.dev.PokeAPI.domain.UserLogin;
import com.dev.PokeAPI.repositories.UserLoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/upload")
    public String uploadPic(@RequestParam("image") MultipartFile archive, Principal principal) {
        return "redirect:/profile";
    }

    @PostMapping("/update-avatar")
    public String updateAvatar(@RequestParam("picProfileUrl") String picUrl, Principal principal) {
        UserLogin user = repo.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPicProfileUrl(picUrl);
        repo.save(user);

        return "redirect:/profile";
    }

    @PostMapping("/update-favPokemon")
    public String updateFavPokemon(@RequestParam("favPokemon") String pokemon, Principal principal) {
        UserLogin user = repo.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFavPokemon(pokemon.trim().toLowerCase());
        repo.save(user);

        return "redirect:/profile";
    }


}
