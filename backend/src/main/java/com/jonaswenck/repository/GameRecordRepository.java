package com.jonaswenck.repository;

import com.jonaswenck.repository.model.GameRecord;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * This {@link CrudRepository} offers CRUD-operations on the {@link GameRecord} entity.
 */
@Repository
public interface GameRecordRepository extends CrudRepository<GameRecord, Long> {
}
