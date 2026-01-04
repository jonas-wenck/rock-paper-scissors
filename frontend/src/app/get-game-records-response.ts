export interface GameRecord {
    playerName: string;
    playerSymbol: 'ROCK' | 'PAPER' | 'SCISSORS';
    opponentSymbol: 'ROCK' | 'PAPER' | 'SCISSORS';
    result: 'PLAYER_WIN' | 'PLAYER_LOSS' | 'DRAW';
    timestamp: string;
}

export interface GetGameRecordsResponse {
    gameRecords: [GameRecord]
}