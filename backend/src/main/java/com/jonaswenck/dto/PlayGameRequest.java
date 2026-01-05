package com.jonaswenck.dto;

import com.jonaswenck.constants.Symbol;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PlayGameRequest(@NotNull Symbol playerSymbol, @NotBlank String playerName) {
}
