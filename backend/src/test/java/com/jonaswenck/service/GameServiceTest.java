package com.jonaswenck.service;

import com.jonaswenck.constants.Result;
import com.jonaswenck.constants.Symbol;
import com.jonaswenck.dto.GameRecordDto;
import com.jonaswenck.repository.GameRecordRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.util.List;
import java.util.stream.Stream;

import static com.jonaswenck.constants.Result.*;
import static com.jonaswenck.constants.Symbol.*;
import static org.junit.jupiter.api.Assertions.*;

/**
 * This @{@link DataJpaTest} only sets up the persistence layer and a {@link GameService} bean so that we can test the business logic in the {@link GameService} as well as its interaction with the {@link GameRecordRepository}.
 */
@DataJpaTest
@Import(GameService.class)
class GameServiceTest {
    
    @Autowired
    private GameService gameService;

    private static Stream<Arguments> providePlayerWinConfiguration() {
        return Stream.of(
                Arguments.of(ROCK, SCISSORS),
                Arguments.of(PAPER, ROCK),
                Arguments.of(SCISSORS, PAPER)
        );
    }

    private static Stream<Arguments> providePlayerLossConfiguration() {
        return Stream.of(
                Arguments.of(SCISSORS, ROCK),
                Arguments.of(ROCK, PAPER),
                Arguments.of(PAPER, SCISSORS)
        );
    }

    private static Stream<Arguments> provideDrawConfiguration() {
        return Stream.of(
                Arguments.of(SCISSORS, SCISSORS),
                Arguments.of(ROCK, ROCK),
                Arguments.of(PAPER, PAPER)
        );
    }

    @ParameterizedTest
    @MethodSource("providePlayerWinConfiguration")
    void shouldResultInPlayerWin(Symbol playerSymbol, Symbol opponentSymbol) {
        // when
        Result result = this.gameService.playGame(playerSymbol, opponentSymbol, null);
        // then
        assertEquals(PLAYER_WIN, result);
    }

    @ParameterizedTest
    @MethodSource("providePlayerLossConfiguration")
    void shouldResultInPlayerLoss(Symbol playerSymbol, Symbol opponentSymbol) {
        // when
        Result result = this.gameService.playGame(playerSymbol, opponentSymbol, null);
        // then
        assertEquals(PLAYER_LOSS, result);
    }

    @ParameterizedTest
    @MethodSource("provideDrawConfiguration")
    void shouldResultInDraw(Symbol playerSymbol, Symbol opponentSymbol) {
        // when
        Result result = this.gameService.playGame(playerSymbol, opponentSymbol, null);
        // then
        assertEquals(DRAW, result);
    }

    @Test
    void shouldPersistAndReturnGameRecord() {
        // when
        this.gameService.playGame(PAPER, ROCK, "John");
        // then
        List<GameRecordDto> gameRecords = this.gameService.getGameRecords();
        assertNotNull(gameRecords);
        assertEquals(1, gameRecords.size());
        GameRecordDto gameRecord = gameRecords.getFirst();
        assertNotNull(gameRecord);
        assertEquals(Result.PLAYER_WIN, gameRecord.result());
        assertEquals("John", gameRecord.playerName());
        assertEquals(PAPER, gameRecord.playerSymbol());
        assertEquals(ROCK, gameRecord.opponentSymbol());
    }
}