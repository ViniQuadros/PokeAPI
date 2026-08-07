package com.dev.PokeAPI.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {

        registry.addViewController("/login").setViewName("login");

        registry.addViewController("/").setViewName("index");
        registry.addViewController("/home").setViewName("index");
        registry.addViewController("/index").setViewName("index");

        registry.addViewController("/denied-page").setViewName("denied-page");
        registry.addViewController("/items").setViewName("items");
        registry.addViewController("/locations").setViewName("locations");
        registry.addViewController("/types").setViewName("types");
        registry.addViewController("/search").setViewName("search");
    }
}
