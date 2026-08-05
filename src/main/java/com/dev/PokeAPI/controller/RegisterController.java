package com.dev.PokeAPI.controller;

import com.dev.PokeAPI.domain.UserLogin;
import com.dev.PokeAPI.repositories.UserLoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class RegisterController {

    private final UserLoginRepository repo;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/register")
    public String registerPage() {
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@RequestParam("username") String username,
                               @RequestParam("password") String password,
                               Model model){

        if(repo.findByUsername(username).isPresent()) {
            model.addAttribute("erro", "User '" + username + "' already exists!");
            //model class works sending messages between java and html

            return "register";
        }

        UserLogin newUser = new UserLogin();
        newUser.setUsername(username);

        String senhaCriptografada = passwordEncoder.encode(password);

        newUser.setPassword(senhaCriptografada);

        repo.save(newUser);

        return "redirect:/login?registered=true";
    }
}
