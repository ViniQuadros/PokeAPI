package com.dev.PokeAPI.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping("/static/html/index")
    public String indexPage() {
        return "index";
    }

}
