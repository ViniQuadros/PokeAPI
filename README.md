# *Welcome to the PokeAPI*

This is a simple documentation "readme" that we made (and are still working on) for learning pourposes

For this project we used:
- Spring and its tools
- JavaScript
- basic HTML and CSS
- API from [PokéAPI](https://pokeapi.co/ "link")

we started creating the User class, that later will be the tb_user on the Neon web database.
    
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
    
    }

After this, we created an account on Neon.tech, that is free by the way (no we aren't sponsored). Then we created the UserRepository to communicate with the web database.
    
    @Repository
    public interface UserLoginRepository extends JpaRepository<UserLogin, Long> {
        Optional<UserLogin> findByUsername(String username);
    }

Repository created, next step, the UserController 
    
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
                    .roles("USER")
                    .build();
        }
    }

our application.properties has this template

    spring.datasource.url=jdbc:postgresql://yourdatabaseregion.aws.neon.tech/neondb?sslmode=require
    spring.datasource.username=username
    spring.datasource.password=password
    spring.datasource.driver-class-name=org.postgresql.Driver
    
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
    spring.jpa.show-sql=true

the url to link to the db, after you create your account on Neon, it will give it to you.

Than, the login and register page was created using simple html and css


