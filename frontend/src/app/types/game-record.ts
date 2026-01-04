import { GameSymbol } from './game-symbol';
import { GameResult } from './game-result';

export interface GameRecord {
  playerName: string;
  playerSymbol: GameSymbol;
  opponentSymbol: GameSymbol;
  result: GameResult;
  timestamp: Date;
}
