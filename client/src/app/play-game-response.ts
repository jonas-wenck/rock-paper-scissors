import {GameSymbol} from './gameSymbol';

export interface PlayGameResponse {
    playerSymbol: GameSymbol;
    opponentSymbol: GameSymbol;
    result: 'PLAYER_WIN' | 'PLAYER_LOSS' | 'DRAW';
}
