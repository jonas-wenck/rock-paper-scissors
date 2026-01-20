import { Component, inject, signal } from '@angular/core';
import { GameService } from '../game.service';
import { catchError, EMPTY, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Result } from '../result/result';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameSymbol } from '../types/game-symbol';
import { GameRecord } from '../types/game-record';
import { MatDialog } from '@angular/material/dialog';
import { ErrorPopUp } from '../error-pop-up/error-pop-up';

@Component({
  selector: 'app-game',
  imports: [
    AsyncPipe,
    MatIcon,
    MatFabButton,
    Result,
    MatButton,
    MatTooltip,
    RouterLink,
  ],
  template: `
    <div>
      @if (gameRecordObservable | async; as gameRecord) {
        <div class="flex flex-col gap-6">
          <!-- result view-->
          <app-result [gameRecord]="gameRecord" [playerName]="playerName()" />
          <div class="flex flex-col items-center">
            <div class="flex gap-6">
              <!-- play again with the current user name -->
              <button matButton="filled" (click)="reset()">Play again</button>
              <!-- offer link to home page to change the name -->
              <a matButton="outlined" routerLink="/">Change name</a>
            </div>
          </div>
        </div>
      } @else {
        <!-- play game view-->
        <div class="flex flex-col items-center gap-6">
          <h2 class="text-4xl text-center">
            {{ playerName() }}, select your symbol
          </h2>
          <div class="flex flex-row gap-3">
            <button
              matFab
              extended
              (click)="playGame(GameSymbol.ROCK)"
              matTooltip="Beats scissors and is beaten by paper."
            >
              <mat-icon svgIcon="rock"></mat-icon>
              Rock
            </button>
            <button
              matFab
              extended
              (click)="playGame(GameSymbol.PAPER)"
              matTooltip="Beats rock and is beaten by scissors."
            >
              <mat-icon svgIcon="paper"></mat-icon>
              Paper
            </button>
            <button
              matFab
              extended
              (click)="playGame(GameSymbol.SCISSORS)"
              matTooltip="Beats paper and is beaten by rock."
            >
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
  protected playerName = signal('');
  // initialize the observable
  protected gameRecordObservable: Observable<GameRecord> | null = null;
  // this is required so that Angular can access the enum type in the template
  protected readonly GameSymbol = GameSymbol;
  // inject the game service
  private readonly gameService: GameService = inject(GameService);
  private readonly dialog = inject(MatDialog);
  // we need the activated route to read the player name
  private readonly activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.activatedRoute.params.subscribe((params) =>
      // set the player name for this session
      this.playerName.set(params['playerName']),
    );
  }

  protected playGame(symbol: GameSymbol): void {
    // update the observable
    this.gameRecordObservable = this.gameService
      .postGame(symbol, this.playerName())
      .pipe(
        catchError(() => {
          this.showErrorDialog();
          return EMPTY;
        }),
      );
  }

  protected reset(): void {
    this.gameRecordObservable = null;
  }

  private showErrorDialog(): void {
    this.dialog.open(ErrorPopUp, {});
  }
}
