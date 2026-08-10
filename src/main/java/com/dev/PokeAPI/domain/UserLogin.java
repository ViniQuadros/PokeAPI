package com.dev.PokeAPI.domain;

import com.dev.PokeAPI.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "tb_user")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class UserLogin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column
    private String picProfileUrl;

    @Column
    private String favPokemon;

    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.USER;

}
