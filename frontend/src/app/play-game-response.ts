export interface PlayGameResponse {
    playerSymbol: 'ROCK' | 'PAPER' | 'SCISSORS';
    opponentSymbol: 'ROCK' | 'PAPER' | 'SCISSORS';
    result: 'PLAYER_WIN' | 'PLAYER_LOSS' | 'DRAW';
}
