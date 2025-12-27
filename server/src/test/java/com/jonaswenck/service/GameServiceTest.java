package com.jonaswenck.service;

import com.jonaswenck.constants.Result;
import com.jonaswenck.constants.Symbol;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class GameServiceTest {

    private GameService service;

    private static Stream<Arguments> providePlayerWinConfiguration() {
        return Stream.of(
                Arguments.of(Symbol.ROCK, Symbol.SCISSORS),
                Arguments.of(Symbol.PAPER, Symbol.ROCK),
                Arguments.of(Symbol.SCISSORS, Symbol.PAPER)
        );
    }

    private static Stream<Arguments> providePlayerLossConfiguration() {
        return Stream.of(
                Arguments.of(Symbol.SCISSORS, Symbol.ROCK),
                Arguments.of(Symbol.ROCK, Symbol.PAPER),
                Arguments.of(Symbol.PAPER, Symbol.SCISSORS)
        );
    }

    private static Stream<Arguments> provideDrawConfiguration() {
        return Stream.of(
                Arguments.of(Symbol.SCISSORS, Symbol.SCISSORS),
                Arguments.of(Symbol.ROCK, Symbol.ROCK),
                Arguments.of(Symbol.PAPER, Symbol.PAPER)
        );
    }

    @BeforeEach
    void setUp() {
        this.service = new GameService();
    }

    @Test
    void shouldThrowExceptionGivenNoSymbol() {
        // when
        Exception exception = assertThrows(IllegalArgumentException.class, () -> this.service.playGame(null, null));

        // then
        assertEquals("playerSymbol is null!", exception.getMessage());
    }

    @ParameterizedTest
    @MethodSource("providePlayerWinConfiguration")
    void shouldResultInPlayerWin(Symbol playerSymbol, Symbol opponentSymbol) {
        // when
        Result result = this.service.playGame(playerSymbol, opponentSymbol);
        // then
        assertEquals(Result.PLAYER_WIN, result);
    }

    @ParameterizedTest
    @MethodSource("providePlayerLossConfiguration")
    void shouldResultInPlayerLoss(Symbol playerSymbol, Symbol opponentSymbol) {
        // when
        Result result = this.service.playGame(playerSymbol, opponentSymbol);
        // then
        assertEquals(Result.PLAYER_LOSS, result);
    }

    @ParameterizedTest
    @MethodSource("provideDrawConfiguration")
    void shouldResultInDraw(Symbol playerSymbol, Symbol opponentSymbol) {
        // when
        Result result = this.service.playGame(playerSymbol, opponentSymbol);
        // then
        assertEquals(Result.DRAW, result);
    }
}