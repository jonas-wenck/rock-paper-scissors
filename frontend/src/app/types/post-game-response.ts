import {GameSymbol} from "./game-symbol";
import {GameResult} from "./game-result";

export interface PostGameResponse {
    playerSymbol: GameSymbol;
    opponentSymbol: GameSymbol;
    result: GameResult;
}
