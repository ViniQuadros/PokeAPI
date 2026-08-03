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
            model.addAttribute("erro", "O nome de usuário '" + username + "' já existe!");
            //a classe e objeto Model serve para enviar mensagem entre java e html

            return "register"; //retorna para voltar à página
        }

        UserLogin usuarioNovo = new UserLogin();
        usuarioNovo.setUsername(username);

        String senhaCriptografada = passwordEncoder.encode(password);

        usuarioNovo.setPassword(senhaCriptografada);

        repo.save(usuarioNovo);

        return "redirect:/login?registered=true";
    }
}
