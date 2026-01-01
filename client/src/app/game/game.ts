import {Component, inject} from '@angular/core';
import {GameService} from "../game.service";
import {Observable} from "rxjs";
import {PlayGameResponse} from "../play-game-response";
import {AsyncPipe} from "@angular/common";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIcon, MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {Result} from "../result/result";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
    selector: 'app-game',
    imports: [
        AsyncPipe, MatIcon, MatFabButton, Result, MatButton, MatTooltip
    ],
    template: `
        <div>
            @if (playGameResponseObservable | async; as response) {
                <div class="flex flex-col gap-6">
                    <!-- result view-->
                    <app-result [playGameResponse]="response"/>
                    <div class="flex flex-col items-center">
                        <button matButton="filled" (click)="reset()">Play again</button>
                    </div>
                </div>
            } @else {
                <!-- play game view-->
                <div class="flex flex-col items-center gap-6">
                    <h2 class="text-4xl">Select your symbol</h2>
                    <div class="flex flex-row gap-3">
                        <button matFab extended (click)="playGame('ROCK')"
                                matTooltip="Beats scissors and is beaten by paper.">
                            <mat-icon svgIcon="rock"></mat-icon>
                            Rock
                        </button>
                        <button matFab extended (click)="playGame('PAPER')"
                                matTooltip="Beats rock and is beaten by scissors.">
                            <mat-icon svgIcon="paper"></mat-icon>
                            Paper
                        </button>
                        <button matFab extended (click)="playGame('SCISSORS')"
                                matTooltip="Beats paper and is beaten by rock.">
                            <mat-icon svgIcon="scissors"></mat-icon>
                            Scissors
                        </button>
                    </div>
                </div>

            }
        </div>
    `,
    styles: ``,
})
export class Game {
    // inject the game service
    gameService: GameService = inject(GameService);
    // initialize the game response observable
    playGameResponseObservable: Observable<PlayGameResponse> | null = null;

    constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'rock', domSanitizer.bypassSecurityTrustResourceUrl('../../assets/rock-svgrepo-com.svg'));
        iconRegistry.addSvgIcon(
            'paper', domSanitizer.bypassSecurityTrustResourceUrl('../../assets/rolled-up-newspaper-svgrepo-com.svg'));
        iconRegistry.addSvgIcon(
            'scissors', domSanitizer.bypassSecurityTrustResourceUrl('../../assets/scissors-svgrepo-com.svg'));
    }

    playGame(symbol: 'ROCK' | 'PAPER' | 'SCISSORS') {
        // update the observable
        this.playGameResponseObservable = this.gameService.playGame(symbol);
    }

    reset() {
        this.playGameResponseObservable = null;
    }
}
