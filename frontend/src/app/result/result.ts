import { Component, input } from '@angular/core';
import { SingleResult } from '../single-result/single-result';
import { GameRecord } from '../types/game-record';

@Component({
  selector: 'app-result',
  imports: [SingleResult],
  template: `
    <!-- display the result-->
    <div class="flex flex-col items-center">
      @if (gameRecord().result === 'PLAYER_WIN') {
        <h2 class="text-4xl text-green-600 text-center">
          {{ playerName() }}, you win!
        </h2>
      } @else if (gameRecord().result === 'PLAYER_LOSS') {
        <h2 class="text-4xl text-red-500 text-center">
          {{ playerName() }}, you loose!
        </h2>
      } @else if (gameRecord().result === 'DRAW') {
        <h2 class="text-4xl text-black text-center">
          {{ playerName() }}, it's a draw!
        </h2>
      }
    </div>
    <div class="flex justify-between">
      <!-- display the symbol chosen by the player -->
      <app-single-result title="You" [symbol]="gameRecord().playerSymbol" />
      <!-- display the symbol chosen by the opponent -->
      <app-single-result
        title="Opponent"
        [symbol]="gameRecord().opponentSymbol"
      />
    </div>
  `,
  styles: ``,
})
export class Result {
  gameRecord = input.required<GameRecord>();
  playerName = input.required<string>();
}
