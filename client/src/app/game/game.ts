import {Component, inject} from '@angular/core';
import {GameService} from "../game.service";
import {GameSymbol} from "../gameSymbol";
import {Observable} from "rxjs";
import {PlayGameResponse} from "../play-game-response";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'app-game',
    imports: [
        AsyncPipe
    ],
    template: `
        <div class="flex flex-col">
            <p>Select your symbol</p>
            <div class="flex flex-row gap-3">
                <button class="primary" (click)="playGame(GameSymbol.ROCK)">ROCK</button>
                <button class="primary" (click)="playGame(GameSymbol.PAPER)">PAPER</button>
                <button class="primary" (click)="playGame(GameSymbol.SCISSORS)">SCISSORS</button>
            </div>
            <p>Opponent chose: {{ (playGameResponse | async)?.opponentSymbol }}</p>
            <p>Result: {{ (playGameResponse | async)?.result }}</p>
        </div>
    `,
    styles: ``,
})
export class Game {
    // inject the game service
    gameService: GameService = inject(GameService);
    // initialize the game response
    playGameResponse: Observable<PlayGameResponse> | null = null;
    // reference the enum type so we can use it in the template
    protected readonly GameSymbol = GameSymbol;

    playGame(symbol: GameSymbol) {
        // update the observable
        this.playGameResponse = this.gameService.playGame(symbol);
    }
}
