package com.jonaswenck.service;

import com.jonaswenck.constants.Result;
import com.jonaswenck.constants.Symbol;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * This service encapsulates the business logic of playing a game of rock, paper, scissors.
 */
@Service
public class GameService {

    private static final Logger LOGGER = LoggerFactory.getLogger(GameService.class);

    /**
     * Plays a game of rock, paper, scissors by comparing the {@code playerSymbol} to the {@code opponentSymbol}.
     *
     * @param playerSymbol the {@link Symbol} chosen by the player.
     * @return the {@link Result} of the symbol comparison.
     */
    public Result playGame(Symbol playerSymbol, Symbol opponentSymbol) {
        if (playerSymbol == null) {
            throw new IllegalArgumentException("playerSymbol is null!");
        } else if (opponentSymbol == null) {
            throw new IllegalArgumentException("opponentSymbol is null!");
        }

        LOGGER.debug("Player chose symbol {}.", playerSymbol);
        LOGGER.debug("Opponent chose symbol {}.", opponentSymbol);

        // compare both symbols to determine the game result
        if (playerSymbol.equals(opponentSymbol)) {
            LOGGER.debug("It's a draw!");
            return Result.DRAW;
        } else if ((playerSymbol == Symbol.ROCK && opponentSymbol == Symbol.SCISSORS) ||
                (playerSymbol == Symbol.PAPER && opponentSymbol == Symbol.ROCK) ||
                (playerSymbol == Symbol.SCISSORS && opponentSymbol == Symbol.PAPER)) {
            LOGGER.debug("The player wins!");
            return Result.PLAYER_WIN;
        } else {
            LOGGER.debug("The player looses!");
            return Result.PLAYER_LOSS;
        }
    }

}
