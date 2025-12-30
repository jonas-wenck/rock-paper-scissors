package com.jonaswenck;

import org.jspecify.annotations.NonNull;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class RockPaperScissorsApplication {
    static void main(String[] args) {
        SpringApplication.run(RockPaperScissorsApplication.class, args);
    }

    /**
     * This CORS-Configurer makes sure that our local client may call the local server.
     *
     * @return the {@link WebMvcConfigurer} with the added CORS-mapping
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/rock-paper-scissors/play-game").allowedOrigins("http://localhost:4200");
            }
        };
    }
}
