package com.jonaswenck.service;

import com.jonaswenck.constants.Result;
import com.jonaswenck.constants.Symbol;
import com.jonaswenck.repository.GameRecordRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.Mockito;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

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

    /**
     * We initialize the service with a mock repo manually. If we used @{@link org.mockito.Mock} and @{@link org.mockito.InjectMocks}, we would declare an unused @Mock GameRepository reference as we only need an instance in the service but don't need to mock any behavior.
     */
    @BeforeEach
    void setUp() {
        this.service = new GameService(Mockito.mock(GameRecordRepository.class));
    }

    @ParameterizedTest
    @MethodSource("providePlayerWinConfiguration")
    void shouldResultInPlayerWin(Symbol playerSymbol, Symbol opponentSymbol) {
        // when
        Result result = this.service.playGame(playerSymbol, opponentSymbol, null);
        // then
        assertEquals(Result.PLAYER_WIN, result);
    }

    @ParameterizedTest
    @MethodSource("providePlayerLossConfiguration")
    void shouldResultInPlayerLoss(Symbol playerSymbol, Symbol opponentSymbol) {
        // when
        Result result = this.service.playGame(playerSymbol, opponentSymbol, null);
        // then
        assertEquals(Result.PLAYER_LOSS, result);
    }

    @ParameterizedTest
    @MethodSource("provideDrawConfiguration")
    void shouldResultInDraw(Symbol playerSymbol, Symbol opponentSymbol) {
        // when
        Result result = this.service.playGame(playerSymbol, opponentSymbol, null);
        // then
        assertEquals(Result.DRAW, result);
    }
}