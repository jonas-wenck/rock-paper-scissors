package com.jonaswenck.controller;

import com.jonaswenck.configuration.SecurityConfig;
import com.jonaswenck.constants.Symbol;
import com.jonaswenck.dto.GameRecordDto;
import com.jonaswenck.dto.PostGameRequest;
import com.jonaswenck.service.GameService;
import com.jonaswenck.service.RandomSymbolService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.resttestclient.autoconfigure.AutoConfigureRestTestClient;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.client.RestTestClient;

import java.time.OffsetDateTime;

import static com.jonaswenck.constants.Result.*;
import static com.jonaswenck.constants.Symbol.*;
import static com.jonaswenck.security.AuthenticationService.API_KEY_HEADER_NAME;
import static org.mockito.Mockito.when;

/**
 * This {@link WebMvcTest} tests the {@link RockPaperScissorsController} and not the service layer. We therefore mock both services and only test the controller itself regarding user input validation, authorization via API key and verifies the expected responses.
 * <p>
 * The {@link SecurityConfig} is not automatically pulled by @{@link WebMvcTest} so we import that manually to be able to test the API key mechanism.
 */
@WebMvcTest(RockPaperScissorsController.class)
@AutoConfigureRestTestClient
@Import({SecurityConfig.class})
class RockPaperScissorsControllerTest {

    private static final String TEST_API_KEY = "U86p7k1o7Q2Bgi4J3AVuOuCBu79MMF";
    private static final String TEST_PLAYER_NAME = "Jonas";

    @Autowired
    private RestTestClient restTestClient;

    @MockitoBean
    private RandomSymbolService randomSymbolService;

    @MockitoBean
    private GameService gameService;

    @Test
    void shouldReturnPlayerWinResponse() {
        // given
        when(this.randomSymbolService.generateRandomSymbol()).thenReturn(Symbol.PAPER);
        when(this.gameService.playGame(SCISSORS, PAPER, TEST_PLAYER_NAME)).thenReturn(new GameRecordDto(TEST_PLAYER_NAME, SCISSORS, PAPER, PLAYER_WIN, OffsetDateTime.now()));
        PostGameRequest request = new PostGameRequest(SCISSORS, TEST_PLAYER_NAME);

        // when/then
        this.restTestClient.post()
                .uri("/rock-paper-scissors/game")
                .headers(headers -> headers.set(API_KEY_HEADER_NAME, TEST_API_KEY))
                .body(request)
                .exchange()
                .expectStatus().isOk()
                .expectBody(String.class)
                .isEqualTo("{\"playerSymbol\":\"SCISSORS\",\"opponentSymbol\":\"PAPER\",\"result\":\"PLAYER_WIN\"}");
    }

    @Test
    void shouldReturnPlayerLossResponse() {
        // given
        when(this.randomSymbolService.generateRandomSymbol()).thenReturn(ROCK);
        when(this.gameService.playGame(SCISSORS, ROCK, TEST_PLAYER_NAME)).thenReturn(new GameRecordDto(TEST_PLAYER_NAME, SCISSORS, ROCK, PLAYER_LOSS, OffsetDateTime.now()));
        PostGameRequest request = new PostGameRequest(SCISSORS, TEST_PLAYER_NAME);

        // when/then
        this.restTestClient.post()
                .uri("/rock-paper-scissors/game")
                .headers(headers -> headers.set(API_KEY_HEADER_NAME, TEST_API_KEY))
                .body(request)
                .exchange()
                .expectStatus().isOk()
                .expectBody(String.class)
                .isEqualTo("{\"playerSymbol\":\"SCISSORS\",\"opponentSymbol\":\"ROCK\",\"result\":\"PLAYER_LOSS\"}");
    }

    @Test
    void shouldReturnDrawResponse() {
        // given
        when(this.randomSymbolService.generateRandomSymbol()).thenReturn(ROCK);
        when(this.gameService.playGame(ROCK, ROCK, TEST_PLAYER_NAME)).thenReturn(new GameRecordDto(TEST_PLAYER_NAME, ROCK, ROCK, DRAW, OffsetDateTime.now()));
        PostGameRequest request = new PostGameRequest(ROCK, TEST_PLAYER_NAME);

        // when/then
        this.restTestClient.post()
                .uri("/rock-paper-scissors/game")
                .headers(headers -> headers.set(API_KEY_HEADER_NAME, TEST_API_KEY))
                .body(request)
                .exchange()
                .expectStatus().isOk()
                .expectBody(String.class)
                .isEqualTo("{\"playerSymbol\":\"ROCK\",\"opponentSymbol\":\"ROCK\",\"result\":\"DRAW\"}");
    }

    @Test
    void shouldReturnBadRequestGivenNoRequestBody() {
        // when/then
        this.restTestClient.post()
                .uri("/rock-paper-scissors/game")
                .headers(headers -> headers.set(API_KEY_HEADER_NAME, TEST_API_KEY))
                .exchange()
                .expectStatus().isBadRequest();
    }

    @Test
    void shouldReturnBadRequestGivenNoPlayerSymbol() {
        // given
        PostGameRequest request = new PostGameRequest(null, TEST_PLAYER_NAME);

        // when/then
        this.restTestClient.post()
                .uri("/rock-paper-scissors/game")
                .headers(headers -> headers.set(API_KEY_HEADER_NAME, TEST_API_KEY))
                .body(request)
                .exchange()
                .expectStatus().isBadRequest();
    }

    @Test
    void shouldReturnBadRequestGivenBlankPlayerName() {
        // given
        PostGameRequest request = new PostGameRequest(ROCK, "");

        // when/then
        this.restTestClient.post()
                .uri("/rock-paper-scissors/game")
                .headers(headers -> headers.set(API_KEY_HEADER_NAME, TEST_API_KEY))
                .body(request)
                .exchange()
                .expectStatus().isBadRequest();
    }

    @Test
    void shouldReturnInternalServerErrorGivenNoOpponentSymbol() {
        // given
        when(this.randomSymbolService.generateRandomSymbol()).thenReturn(null);
        PostGameRequest request = new PostGameRequest(ROCK, TEST_PLAYER_NAME);

        // when/then
        this.restTestClient.post()
                .uri("/rock-paper-scissors/game")
                .headers(headers -> headers.set(API_KEY_HEADER_NAME, TEST_API_KEY))
                .body(request)
                .exchange()
                .expectStatus().is5xxServerError();
    }

    @Test
    void shouldReturnUnauthorizedGivenNoApiKey() {
        // given
        PostGameRequest request = new PostGameRequest(SCISSORS, TEST_PLAYER_NAME);

        // when/then
        this.restTestClient.post()
                .uri("/rock-paper-scissors/game")
                .body(request)
                .exchange()
                .expectStatus().isUnauthorized();
    }

    @Test
    void shouldReturnUnauthorizedGivenWrongApiKey() {
        // given
        PostGameRequest request = new PostGameRequest(SCISSORS, TEST_PLAYER_NAME);

        // when/then
        this.restTestClient.post()
                .uri("/rock-paper-scissors/game")
                .headers(headers -> headers.set(API_KEY_HEADER_NAME, "wrong key"))
                .body(request)
                .exchange()
                .expectStatus().isUnauthorized();
    }
}