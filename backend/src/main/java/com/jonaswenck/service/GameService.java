package com.jonaswenck.service;

import com.jonaswenck.constants.Result;
import com.jonaswenck.constants.Symbol;
import com.jonaswenck.dto.GameRecordDto;
import com.jonaswenck.repository.GameRecordRepository;
import com.jonaswenck.repository.model.GameRecord;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.StreamSupport;

/**
 * This service encapsulates the business logic of playing a game of rock, paper, scissors.
 */
@Service
public class GameService {

    private static final Logger LOGGER = LoggerFactory.getLogger(GameService.class);

    private final GameRecordRepository gameRecordRepository;

    public GameService(@Autowired GameRecordRepository gameRecordRepository) {
        this.gameRecordRepository = gameRecordRepository;
    }

    /**
     * Plays a game of rock, paper, scissors by comparing the {@code playerSymbol} to the {@code opponentSymbol}. The game is persisted as a {@link GameRecord}.
     *
     * @param playerSymbol   the {@link Symbol} chosen by the player
     * @param opponentSymbol the {@link Symbol} chosen by the opponent
     * @param playerName     the name of the player (optional)
     * @return the {@link Result} of the symbol comparison.
     */
    public Result playGame(@Nonnull Symbol playerSymbol, @NonNull Symbol opponentSymbol, @Nullable String playerName) {

        LOGGER.debug("Player chose symbol {}.", playerSymbol);
        LOGGER.debug("Opponent chose symbol {}.", opponentSymbol);

        Result result;

        // compare both symbols to determine the game result
        if (playerSymbol.equals(opponentSymbol)) {
            LOGGER.debug("It's a draw!");
            result = Result.DRAW;
        } else if ((playerSymbol == Symbol.ROCK && opponentSymbol == Symbol.SCISSORS) ||
                (playerSymbol == Symbol.PAPER && opponentSymbol == Symbol.ROCK) ||
                (playerSymbol == Symbol.SCISSORS && opponentSymbol == Symbol.PAPER)) {
            LOGGER.debug("The player wins!");
            result = Result.PLAYER_WIN;
        } else {
            LOGGER.debug("The player looses!");
            result = Result.PLAYER_LOSS;
        }

        // persist the game record and use a fallback player name if none is given
        this.gameRecordRepository.save(new GameRecord(playerName != null ? playerName : "Anonymous", playerSymbol, opponentSymbol, result, OffsetDateTime.now()));

        return result;
    }

    /**
     * Returns all {@link GameRecordDto} objects without guaranteeing any order.
     *
     * @return a {@link List} of {@link GameRecordDto} objects
     */
    public List<GameRecordDto> getGameRecords() {
        return StreamSupport.stream(this.gameRecordRepository.findAll().spliterator(), false)
                .map(gameRecord -> new GameRecordDto(gameRecord.getPlayerName(), gameRecord.getPlayerSymbol(), gameRecord.getOpponentSymbol(), gameRecord.getResult(), gameRecord.getTimestamp()))
                .toList();
    }
}
