package com.jonaswenck.controller;

import com.jonaswenck.configuration.SecurityConfig;
import com.jonaswenck.constants.Symbol;
import com.jonaswenck.dto.PlayGameRequest;
import com.jonaswenck.repository.GameRecordRepository;
import com.jonaswenck.service.GameService;
import com.jonaswenck.service.RandomSymbolService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.resttestclient.autoconfigure.AutoConfigureRestTestClient;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.client.RestTestClient;

import static com.jonaswenck.security.AuthenticationService.API_KEY_HEADER_NAME;
import static org.mockito.Mockito.when;

@WebMvcTest(RockPaperScissorsController.class)
@AutoConfigureRestTestClient
// import the beans that are not auto-imported by the @WebMvcTest-annotation
@Import({GameService.class, SecurityConfig.class})
class RockPaperScissorsControllerTest {

    private static final String TEST_API_KEY = "U86p7k1o7Q2Bgi4J3AVuOuCBu79MMF";
    private static final String TEST_PLAYER_NAME = "Jonas";

    @Autowired
    private RestTestClient restTestClient;

    @MockitoBean
    private RandomSymbolService randomSymbolService;

    @MockitoBean
    private GameRecordRepository gameRecordRepository;

    @Test
    void shouldReturnPlayerWinResponse() {
        // given
        when(this.randomSymbolService.generateRandomSymbol()).thenReturn(Symbol.PAPER);
        PlayGameRequest request = new PlayGameRequest(Symbol.SCISSORS, TEST_PLAYER_NAME);

        // when/then
        this.restTestClient.post()
                .uri("/rock-paper-scissors/play-game")
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
        when(this.randomSymbolService.generateRandomSymbol()).thenReturn(Symbol.ROCK);
        PlayGameRequest request = new PlayGameRequest(Symbol.SCISSORS, TEST_PLAYER_NAME);

        // when/then
        this.restTestClient.post()
                .uri("/rock-paper-scissors/play-game")
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
        when(this.randomSymbolService.generateRandomSymbol()).thenReturn(Symbol.ROCK);
        PlayGameRequest request = new PlayGameRequest(Symbol.ROCK, TEST_PLAYER_NAME);

        // when/then
        this.restTestClient.post()
                .uri("/rock-paper-scissors/play-game")
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
                .uri("/rock-paper-scissors/play-game")
                .headers(headers -> headers.set(API_KEY_HEADER_NAME, TEST_API_KEY))
                .exchange()
                .expectStatus().isBadRequest();
    }

    @Test
    void shouldReturnBadRequestGivenNoPlayerSymbol() {
        // given
        PlayGameRequest request = new PlayGameRequest(null, TEST_PLAYER_NAME);

        // when/then
        this.restTestClient.post()
                .uri("/rock-paper-scissors/play-game")
                .headers(headers -> headers.set(API_KEY_HEADER_NAME, TEST_API_KEY))
                .body(request)
                .exchange()
                .expectStatus().isBadRequest();
    }

    @Test
    void shouldReturnBadRequestGivenBlankPlayerName() {
        // given
        PlayGameRequest request = new PlayGameRequest(Symbol.ROCK, "");

        // when/then
        this.restTestClient.post()
                .uri("/rock-paper-scissors/play-game")
                .headers(headers -> headers.set(API_KEY_HEADER_NAME, TEST_API_KEY))
                .body(request)
                .exchange()
                .expectStatus().isBadRequest();
    }

    @Test
    void shouldReturnInternalServerErrorGivenNoOpponentSymbol() {
        // given
        when(this.randomSymbolService.generateRandomSymbol()).thenReturn(null);
        PlayGameRequest request = new PlayGameRequest(Symbol.ROCK, TEST_PLAYER_NAME);

        // when/then
        this.restTestClient.post()
                .uri("/rock-paper-scissors/play-game")
                .headers(headers -> headers.set(API_KEY_HEADER_NAME, TEST_API_KEY))
                .body(request)
                .exchange()
                .expectStatus().is5xxServerError();
    }

    @Test
    void shouldReturnUnauthorizedGivenNoApiKey() {
        // given
        PlayGameRequest request = new PlayGameRequest(Symbol.SCISSORS, TEST_PLAYER_NAME);

        // when/then
        this.restTestClient.post()
                .uri("/rock-paper-scissors/play-game")
                .body(request)
                .exchange()
                .expectStatus().isUnauthorized();
    }

    @Test
    void shouldReturnUnauthorizedGivenWrongApiKey() {
        // given
        PlayGameRequest request = new PlayGameRequest(Symbol.SCISSORS, TEST_PLAYER_NAME);

        // when/then
        this.restTestClient.post()
                .uri("/rock-paper-scissors/play-game")
                .headers(headers -> headers.set(API_KEY_HEADER_NAME, "wrong key"))
                .body(request)
                .exchange()
                .expectStatus().isUnauthorized();
    }
}