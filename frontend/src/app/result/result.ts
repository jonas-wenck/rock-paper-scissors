import {Component, input} from '@angular/core';
import {PlayGameResponse} from "../types/play-game-response";
import {SingleResult} from "../single-result/single-result";

@Component({
    selector: 'app-result',
    imports: [
        SingleResult
    ],
    template: `
        <!-- display the result-->
        <div class="flex flex-col items-center">
            @if (playGameResponse().result === "PLAYER_WIN") {
                <h2 class="text-4xl text-green-500">{{ playerName() }}, you win!</h2>
            } @else if (playGameResponse().result === "PLAYER_LOSS") {
                <h2 class="text-4xl text-red-500">{{ playerName() }}, you loose!</h2>
            } @else if (playGameResponse().result === "DRAW") {
                <h2 class="text-4xl text-black">{{ playerName() }}, it's a draw!</h2>
            }
        </div>
        <div class="flex justify-between">
            <!-- display the symbol chosen by the player -->
            <app-single-result title="You" [symbol]="playGameResponse().playerSymbol"/>
            <!-- display the symbol chosen by the opponent -->
            <app-single-result title="Opponent" [symbol]="playGameResponse().opponentSymbol"/>
        </div>
    `,
    styles: ``,
})
export class Result {
    playGameResponse = input.required<PlayGameResponse>();
    playerName = input.required<string>();
}
