package com.jonaswenck.actuator;

import com.jonaswenck.repository.GameRecordRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.health.contributor.Health;
import org.springframework.boot.health.contributor.HealthIndicator;
import org.springframework.stereotype.Component;

/**
 * This {@link HealthIndicator} checks if the game is ready by querying the database to check if the table exists and returns any amount of rows (even 0).
 */
@Component("game")
public class GameHealthIndicator implements HealthIndicator {
    private static final Logger LOGGER = LoggerFactory.getLogger(GameHealthIndicator.class);
    private final GameRecordRepository gameRecordRepository;

    public GameHealthIndicator(GameRecordRepository gameRecordRepository) {
        this.gameRecordRepository = gameRecordRepository;
    }

    @Override
    public Health health() {
        try {
            long rowCount = this.gameRecordRepository.count();
            return rowCount >= 0 ? Health.up().build() : Health.down().build();
        } catch (Exception exception) {
            LOGGER.error(exception.getMessage(), exception);
            return Health.down().build();
        }
    }
}
