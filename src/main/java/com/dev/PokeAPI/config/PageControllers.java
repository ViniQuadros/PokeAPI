package com.dev.PokeAPI.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageControllers {
    @GetMapping({"/", "/home", "/index"})
    public String home() {
        return "index";
    }

    @GetMapping("/items")
    public String items() {
        return "items";
    }

    @GetMapping("/locations")
    public String locations() {
        return "locations";
    }

    @GetMapping("/types")
    public String types() {
        return "types";
    }

    @GetMapping("/search")
    public String search() {
        return "search";
    }

    @GetMapping("/games")
    public String games() {
        return "games";
    }
}
