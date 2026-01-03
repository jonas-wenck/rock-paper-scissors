package com.jonaswenck.dto;

import com.jonaswenck.constants.Result;
import com.jonaswenck.constants.Symbol;

import java.time.OffsetDateTime;

public record GameRecordDto(String playerName, Symbol playerSymbol, Symbol opponentSymbol, Result result,
                            OffsetDateTime timestamp) {
}
