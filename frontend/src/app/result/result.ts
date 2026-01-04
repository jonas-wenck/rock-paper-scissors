import { Component, input } from '@angular/core';
import { PostGameResponse } from '../types/post-game-response';
import { SingleResult } from '../single-result/single-result';

@Component({
  selector: 'app-result',
  imports: [SingleResult],
  template: `
    <!-- display the result-->
    <div class="flex flex-col items-center">
      @if (postGameResponse().result === 'PLAYER_WIN') {
        <h2 class="text-4xl text-green-500">{{ playerName() }}, you win!</h2>
      } @else if (postGameResponse().result === 'PLAYER_LOSS') {
        <h2 class="text-4xl text-red-500">{{ playerName() }}, you loose!</h2>
      } @else if (postGameResponse().result === 'DRAW') {
        <h2 class="text-4xl text-black">{{ playerName() }}, it's a draw!</h2>
      }
    </div>
    <div class="flex justify-between">
      <!-- display the symbol chosen by the player -->
      <app-single-result
        title="You"
        [symbol]="postGameResponse().playerSymbol"
      />
      <!-- display the symbol chosen by the opponent -->
      <app-single-result
        title="Opponent"
        [symbol]="postGameResponse().opponentSymbol"
      />
    </div>
  `,
  styles: ``,
})
export class Result {
  postGameResponse = input.required<PostGameResponse>();
  playerName = input.required<string>();
}
