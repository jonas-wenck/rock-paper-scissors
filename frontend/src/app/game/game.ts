import {Component, inject, signal} from '@angular/core';
import {GameService} from "../game.service";
import {Observable} from "rxjs";
import {PlayGameResponse} from "../play-game-response";
import {AsyncPipe} from "@angular/common";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Result} from "../result/result";
import {MatTooltip} from "@angular/material/tooltip";
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
    selector: 'app-game',
    imports: [
        AsyncPipe, MatIcon, MatFabButton, Result, MatButton, MatTooltip, RouterLink
    ],
    template: `
        <div>
            @if (playGameResponseObservable | async; as response) {
                <div class="flex flex-col gap-6">
                    <!-- result view-->
                    <app-result [playGameResponse]="response" [playerName]="playerName()"/>
                    <div class="flex flex-col items-center">
                        <div class="flex gap-6">
                            <!-- play again with the current user name -->
                            <button matButton="filled" (click)="reset()">Play again</button>
                            <!-- offer link to home page to change the name -->
                            <a matButton="outlined" routerLink="/">Change name</a></div>
                    </div>
                </div>
            } @else {
                <!-- play game view-->
                <div class="flex flex-col items-center gap-6">
                    <h2 class="text-4xl">{{ playerName() }}, select your symbol</h2>
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
    // we retrieve the player name from the route
    playerName = signal('');
    // inject the game service
    gameService: GameService = inject(GameService);
    // initialize the game response observable
    playGameResponseObservable: Observable<PlayGameResponse> | null = null;
    // we need the activated route to read the player name
    private activatedRoute = inject(ActivatedRoute);

    constructor() {
        this.activatedRoute.params.subscribe((params) => {
            // set the player name for this session
            this.playerName.set(params['playerName']);
        });
    }

    playGame(symbol: 'ROCK' | 'PAPER' | 'SCISSORS') {
        // update the observable
        this.playGameResponseObservable = this.gameService.playGame(symbol, this.playerName());
    }

    reset() {
        this.playGameResponseObservable = null;
    }
}
