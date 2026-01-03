package com.jonaswenck.dto;

import java.util.List;

public record GetGameRecordsResponse(List<GameRecordDto> gameRecords) {
}
