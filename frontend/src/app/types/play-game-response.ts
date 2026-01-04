import {GameSymbol} from "./game-symbol";
import {GameResult} from "./game-result";

export interface PlayGameResponse {
    playerSymbol: GameSymbol;
    opponentSymbol: GameSymbol;
    result: GameResult;
}
