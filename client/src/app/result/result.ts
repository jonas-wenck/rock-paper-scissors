import {Component, input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {PlayGameResponse} from "../play-game-response";

@Component({
    selector: 'app-result',
    imports: [
        NgOptimizedImage
    ],
    template: `
        <!-- display the result-->
        <div class="flex flex-col items-center">
            @if (playGameResponse().result === "PLAYER_WIN") {
                <h2 class="text-4xl text-green-500">You win!</h2>
            } @else if (playGameResponse().result === "PLAYER_LOSS") {
                <h2 class="text-4xl text-red-500">You loose!</h2>
            } @else if (playGameResponse().result === "DRAW") {
                <h2 class="text-4xl text-black">It's a draw!</h2>
            }
        </div>
        <div class="flex justify-between">
            <!-- display the symbol chosen by the player -->
            <div class="flex flex-col items-center">
                <p class="text-4xl">You chose: {{ playGameResponse().playerSymbol }}</p>
                <img [ngSrc]="imageMap[playGameResponse().playerSymbol]" height="100"
                     width="100" [alt]="imageAltMap[playGameResponse().playerSymbol]" priority/>
            </div>
            <!-- display the symbol chosen by the opponent -->
            <div class="flex flex-col items-center">
                <p class="text-4xl">Opponent chose: {{ playGameResponse().opponentSymbol }}</p>
                <img [ngSrc]="imageMap[playGameResponse().opponentSymbol]" height="100"
                     width="100" [alt]="imageAltMap[playGameResponse().opponentSymbol]" priority/>
            </div>
        </div>
    `,
    styles: ``,
})
export class Result {
    playGameResponse = input.required<PlayGameResponse>();

    readonly imageMap: Record<string, string> = {
        'ROCK': 'assets/rock-svgrepo-com.svg',
        'PAPER': 'assets/rolled-up-newspaper-svgrepo-com.svg',
        'SCISSORS': 'assets/scissors-svgrepo-com.svg',
    };

    readonly imageAltMap: Record<string, string> = {
        'ROCK': 'Rock',
        'PAPER': 'Paper',
        'SCISSORS': 'Scissors',
    };
}
