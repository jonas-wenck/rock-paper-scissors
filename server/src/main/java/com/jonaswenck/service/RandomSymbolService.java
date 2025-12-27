package com.jonaswenck.service;

import com.jonaswenck.constants.Symbol;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Random;

/**
 * This service generates a random {@link Symbol}.
 */
@Service
public class RandomSymbolService {
    private static final Logger LOGGER = LoggerFactory.getLogger(RandomSymbolService.class);

    /**
     * Generates and returns a random {@link Symbol}.
     *
     * @return the generated {@link Symbol}
     */
    public Symbol generateRandomSymbol() {
        int randomIndex = new Random().nextInt(Symbol.values().length);
        Symbol randomSymbol = Symbol.values()[randomIndex];
        LOGGER.debug("Chose random symbol {}.", randomSymbol);
        return randomSymbol;
    }
}
