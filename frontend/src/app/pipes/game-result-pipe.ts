import {Pipe, PipeTransform} from "@angular/core";
import {GameResult} from "../types/game-result";

/**
 * Transforms the given GameResult into a human-readable format.
 */
@Pipe({
    name: 'gameresult'
})
export class GameResultPipe implements PipeTransform {
    transform(value: GameResult): string {
        switch (value) {
            case "PLAYER_WIN":
                return 'Win';
            case "PLAYER_LOSS":
                return 'Loss';
            case "DRAW":
                return 'Draw';
            default:
                return "";
        }
    }
}