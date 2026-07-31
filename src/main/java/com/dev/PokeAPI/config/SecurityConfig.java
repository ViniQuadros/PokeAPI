package com.dev.PokeAPI.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Regras de Autorização
                .authorizeHttpRequests(auth -> auth
                        // Permite acesso público à página de login e ficheiros estáticos (CSS, JS, imagens)
                        .requestMatchers("/login", "/css/**", "/js/**", "/images/**").permitAll()
                        // Todas as outras rotas (incluindo a /home do seu parceiro) exigem autenticação
                        .anyRequest().authenticated()
                )
                // 2. Configuração do Formulário de Login
                .formLogin(form -> form
                        .loginPage("/login")               // Rota que exibe a sua página HTML de login
                        .defaultSuccessUrl("/index", true)  // Redireciona para a página do seu parceiro após o login
                        .permitAll()
                )
                // 3. Configuração de Encerramento de Sessão (Logout)
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login?logout")
                        .permitAll()
                );

        return http.build();
    }

    // Codificador de palavras-passe utilizando o algoritmo BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
