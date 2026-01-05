package com.jonaswenck.controller;

import com.jonaswenck.constants.Symbol;
import com.jonaswenck.dto.GameRecordDto;
import com.jonaswenck.dto.PlayGameRequest;
import com.jonaswenck.service.GameService;
import com.jonaswenck.service.RandomSymbolService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * This @{@link RestController} exposes the rock, paper, scissors game via REST.
 */
@RestController
@RequestMapping("rock-paper-scissors/games")
public class RockPaperScissorsController {

    private final GameService gameService;
    private final RandomSymbolService randomSymbolService;

    public RockPaperScissorsController(GameService gameService, RandomSymbolService randomSymbolService) {
        this.gameService = gameService;
        this.randomSymbolService = randomSymbolService;
    }

    /**
     * Handle the POST-mapping to play a game of rock, paper, scissors.
     *
     * @param request the {@link PlayGameRequest} needs to be valid as devised in the class
     * @return the {@link GameRecordDto} represents the played game
     */
    @PostMapping
    public GameRecordDto play(@RequestBody @Valid PlayGameRequest request) {

        // generate symbol for the opponent
        Symbol opponentSymbol = this.randomSymbolService.generateRandomSymbol();
        if (opponentSymbol == null) {
            // the client can do nothing about this
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // play the game
        return this.gameService.playGame(request.playerSymbol(), opponentSymbol, request.playerName());
    }

    /**
     * Returns all game records.
     *
     * @return the {@link java.util.List} of all game records
     */
    @GetMapping
    public List<GameRecordDto> getAll() {
        return this.gameService.getGameRecords();
    }

    /**
     * Handle a failed request validation
     *
     * @param exception the {@link MethodArgumentNotValidException} to handle
     * @return a {@link Map} describing the failed validations
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException exception) {
        Map<String, String> errors = new HashMap<>();
        exception.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
