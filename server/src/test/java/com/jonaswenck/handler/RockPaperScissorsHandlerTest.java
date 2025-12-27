package com.jonaswenck.handler;

import com.jonaswenck.constants.Symbol;
import com.jonaswenck.service.GameService;
import com.jonaswenck.service.RandomSymbolService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.resttestclient.autoconfigure.AutoConfigureRestTestClient;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.client.RestTestClient;

import static org.mockito.Mockito.when;

@WebMvcTest(RockPaperScissorsHandler.class)
@AutoConfigureRestTestClient
// import the game service bean as we do not want to mock that
@Import(GameService.class)
class RockPaperScissorsHandlerTest {

    @Autowired
    private RestTestClient restTestClient;

    @MockitoBean
    private RandomSymbolService randomSymbolService;

    @Test
    void shouldReturnPlayerWinResponse() {
        // given
        when(this.randomSymbolService.generateRandomSymbol()).thenReturn(Symbol.PAPER);
        PlayGameRequest request = new PlayGameRequest(Symbol.SCISSORS);

        // when/then
        this.restTestClient.post().uri("/rock-paper-scissors/play-game")
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
        PlayGameRequest request = new PlayGameRequest(Symbol.SCISSORS);

        // when/then
        this.restTestClient.post().uri("/rock-paper-scissors/play-game")
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
        PlayGameRequest request = new PlayGameRequest(Symbol.ROCK);

        // when/then
        this.restTestClient.post().uri("/rock-paper-scissors/play-game")
                .body(request)
                .exchange()
                .expectStatus().isOk()
                .expectBody(String.class)
                .isEqualTo("{\"playerSymbol\":\"ROCK\",\"opponentSymbol\":\"ROCK\",\"result\":\"DRAW\"}");
    }

    @Test
    void shouldReturnBadRequestGivenNoRequestBody() {
        // when/then
        this.restTestClient.post().uri("/rock-paper-scissors/play-game")
                .exchange()
                .expectStatus().isBadRequest();
    }

    @Test
    void shouldReturnInternalServerErrorGivenNoOpponentSymbol() {
        // given
        when(this.randomSymbolService.generateRandomSymbol()).thenReturn(null);
        PlayGameRequest request = new PlayGameRequest(Symbol.ROCK);

        // when/then
        this.restTestClient.post().uri("/rock-paper-scissors/play-game")
                .body(request)
                .exchange()
                .expectStatus().is5xxServerError();
    }

}