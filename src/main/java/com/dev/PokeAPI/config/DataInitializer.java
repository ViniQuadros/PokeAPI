package com.dev.PokeAPI.config;

import com.dev.PokeAPI.domain.UserLogin;
import com.dev.PokeAPI.enums.UserRole;
import com.dev.PokeAPI.repositories.UserLoginRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDataBase(UserLoginRepository repo, PasswordEncoder p) {
        return args -> {
            if(repo.count() == 0) {
                UserLogin admin = new UserLogin();
                admin.setUsername("admin");
                admin.setPassword(p.encode("admin123"));
                admin.setRole(UserRole.ADMIN);

                repo.save(admin);
            }
        };
    }
}
