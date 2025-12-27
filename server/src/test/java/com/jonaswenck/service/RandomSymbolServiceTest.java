package com.jonaswenck.service;

import com.jonaswenck.constants.Symbol;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class RandomSymbolServiceTest {

    private RandomSymbolService service;

    @BeforeEach
    void setUp() {
        this.service = new RandomSymbolService();
    }

    @Test
    void shouldGenerateSomeSymbol() {

        // when
        Symbol symbol = this.service.generateRandomSymbol();

        // then
        assertNotNull(symbol);
    }
}