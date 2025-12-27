package com.jonaswenck.handler;

import com.jonaswenck.constants.Result;
import com.jonaswenck.constants.Symbol;
import com.jonaswenck.service.GameService;
import com.jonaswenck.service.RandomSymbolService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 * This @{@link RestController} exposes the rock, paper, scissors game to the client via REST.
 */
@RestController
@RequestMapping("rock-paper-scissors")
public class RockPaperScissorsHandler {

    private final GameService gameService;
    private final RandomSymbolService randomSymbolService;

    public RockPaperScissorsHandler(GameService gameService, RandomSymbolService randomSymbolService) {
        this.gameService = gameService;
        this.randomSymbolService = randomSymbolService;
    }

    /**
     * Handle the POST-mapping to play a game of rock, paper, scissors.
     *
     * @param request the {@link PlayGameRequest} needs to contain the {@link Symbol} chosen by the player
     * @return the {@link PlayGameResponse} contains the {@link Symbol} from the {@code request}, the opponent's {@link Symbol} as well as the game {@link Result}.
     */
    @PostMapping("/play-game")
    public PlayGameResponse playGame(@RequestBody PlayGameRequest request) {
        // validate inputs
        if (request == null || request.playerSymbol() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Player symbol is missing in request");
        }

        // generate symbol for the opponent
        Symbol opponentSymbol = this.randomSymbolService.generateRandomSymbol();
        if (opponentSymbol == null) {
            // the client can do nothing about this
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // determine the result
        Result result = this.gameService.playGame(request.playerSymbol(), opponentSymbol);

        return new PlayGameResponse(request.playerSymbol(), opponentSymbol, result);
    }
}
