package com.jonaswenck.configuration;

import com.jonaswenck.security.AuthenticationFilter;
import com.jonaswenck.security.AuthenticationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

/**
 * This Spring security config makes sure that all our requests require an API key.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public AuthenticationService authenticationService(@Value("${api.key}") String apiKey) {
        return new AuthenticationService(apiKey);
    }

    @Bean
    public AuthenticationFilter authenticationFilter(AuthenticationService authenticationService) {
        return new AuthenticationFilter(authenticationService);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity, AuthenticationFilter authenticationFilter) {
        httpSecurity
                // we secure our stateless API with API keys and have no user sessions, so we do not need CSRF protection
                .csrf(AbstractHttpConfigurer::disable)
                // this makes sure that our Spring MVC CORS configuration is used so that CORS can be processed before Spring Security
                .cors(withDefaults())
                // we require all requests to be authorized
                .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> authorizationManagerRequestMatcherRegistry.requestMatchers("/**").authenticated())
                // our API is stateless
                .sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // our API key needs to be evaluated before the username/pw filter
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }
}
