package com.jonaswenck.configuration;

import jakarta.annotation.Nonnull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static com.jonaswenck.security.AuthenticationService.API_KEY_HEADER_NAME;

/**
 * This @{@link Configuration} makes sure that our proxy may call the local server.
 *
 */
@Configuration
public class WebMvcConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer(@Value("${cors.allowed.origins}") String allowedOrigins) {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@Nonnull CorsRegistry registry) {
                registry.addMapping("/rock-paper-scissors/**")
                        // proxy origin
                        .allowedOrigins(allowedOrigins)
                        // we only need POST and OPTIONS for now
                        .allowedMethods("POST", "OPTIONS")
                        // allow X-API-KEY and content type header
                        .allowedHeaders(API_KEY_HEADER_NAME, HttpHeaders.CONTENT_TYPE);
            }
        };
    }
}
