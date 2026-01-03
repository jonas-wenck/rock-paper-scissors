package com.jonaswenck.repository.model;

import com.jonaswenck.constants.Result;
import com.jonaswenck.constants.Symbol;
import jakarta.persistence.*;

import java.time.OffsetDateTime;

/**
 * This @{@link Entity} represents a record of a game of rock, paper, scissors.
 */
@Entity
public class GameRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * The name of the player.
     */
    private String playerName;

    /**
     * The {@link Symbol} chosen by the player.
     */
    @Enumerated(EnumType.STRING)
    private Symbol playerSymbol;

    /**
     * The {@link Symbol} chosen by the opponent.
     */
    @Enumerated(EnumType.STRING)
    private Symbol opponentSymbol;

    /**
     * The {@link Result} of the game.
     */
    @Enumerated(EnumType.STRING)
    private Result result;

    /**
     * The {@link OffsetDateTime} when the game took place.
     */
    @Column(columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private OffsetDateTime timestamp;

    public GameRecord() {
        // this no-args constructor is for JPA
    }

    public GameRecord(String playerName, Symbol playerSymbol, Symbol opponentSymbol, Result result, OffsetDateTime timestamp) {
        this.playerName = playerName;
        this.playerSymbol = playerSymbol;
        this.opponentSymbol = opponentSymbol;
        this.result = result;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public String getPlayerName() {
        return playerName;
    }

    public Symbol getPlayerSymbol() {
        return playerSymbol;
    }

    public Symbol getOpponentSymbol() {
        return opponentSymbol;
    }

    public Result getResult() {
        return result;
    }

    public OffsetDateTime getTimestamp() {
        return timestamp;
    }
}
