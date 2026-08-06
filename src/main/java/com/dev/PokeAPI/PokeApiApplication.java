package com.dev.PokeAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication

// Força o Spring a procurar repositórios nesta pasta específica
@EnableJpaRepositories(basePackages = "com.dev.PokeAPI.repositories")

//force spring to scan for entities in this package
@EntityScan(basePackages = "com.dev.PokeAPI.domain")

public class PokeApiApplication {

	static void main(String[] args) {
		SpringApplication.run(PokeApiApplication.class, args);
	}

}