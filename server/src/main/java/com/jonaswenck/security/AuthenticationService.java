package com.jonaswenck.security;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;

/**
 * This simple service retrieves the {@code X-API-KEY} header from the {@link HttpServletRequest} and makes sure that it exists and equals the configured {@code apiKey}.
 */
public class AuthenticationService {

    public static final String API_KEY_HEADER_NAME = "X-API-KEY";
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationService.class);
    private static final String ERROR_MESSAGE = "Invalid API Key";

    private final String apiKey;

    public AuthenticationService(String apiKey) {
        this.apiKey = apiKey;
    }

    public Authentication getAuthentication(HttpServletRequest request) {
        String apiKey = request.getHeader(API_KEY_HEADER_NAME);
        if (apiKey == null || !apiKey.equals(this.apiKey)) {
            LOGGER.debug("API key is missing or not valid!");
            throw new BadCredentialsException(ERROR_MESSAGE);
        }
        LOGGER.trace("API key is valid.");

        return new ApiKeyAuthentication(apiKey, AuthorityUtils.NO_AUTHORITIES);
    }
}