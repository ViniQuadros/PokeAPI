package com.dev.PokeAPI.services;

import com.dev.PokeAPI.domain.UserLogin;
import com.dev.PokeAPI.repositories.UserLoginRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserLoginService implements UserDetailsService {

    private final UserLoginRepository repo;

    public UserLoginService(UserLoginRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserLogin user = repo.findByUsername(username).
                orElseThrow(() -> new UsernameNotFoundException("User not found " + username));

        return User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
    }
}
