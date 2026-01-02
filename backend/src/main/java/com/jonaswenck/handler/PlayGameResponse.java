package com.jonaswenck.handler;

import com.jonaswenck.constants.Result;
import com.jonaswenck.constants.Symbol;

public record PlayGameResponse(Symbol playerSymbol, Symbol opponentSymbol, Result result) {
}
