package com.dev.PokeAPI.controller;

import com.dev.PokeAPI.domain.UserLogin;
import com.dev.PokeAPI.repositories.UserLoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserLoginRepository repo;

    @GetMapping("/users")
    public String findAll(Model model) {
        List<UserLogin> all = repo.findAll();
        model.addAttribute("users", all);

        return "admin";
    }

    @PostMapping("/users/delete/{id}")
    public String deletarUsuario(@PathVariable("id") Long id) {
        Optional<UserLogin> user = repo.findById(id);

        if (user.isPresent() && !user.get().getUsername().equals("admin")) {
            repo.deleteById(id);
        }

        return "redirect:/admin/users";
    }
}
