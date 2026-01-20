import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { GameSymbol } from '../types/game-symbol';

@Component({
  selector: 'app-single-result',
  imports: [NgOptimizedImage],
  template: `
    <div class="flex flex-col items-center p-6">
      <p class="text-4xl pb-12">{{ title() }}</p>
      <div class="flex flex-col items-center outline-2 rounded-lg p-4">
        <p class="text-2xl pb-6">{{ symbol() }}</p>
        <!-- we use an empty alt-attribute here as this image is decorative-->
        <img
          [ngSrc]="imageMap[symbol()]"
          height="100"
          width="100"
          alt=""
          priority
        />
      </div>
    </div>
  `,
  styles: ``,
})
export class SingleResult {
  title = input.required<string>();
  symbol = input.required<GameSymbol>();
  protected readonly imageMap: Record<GameSymbol, string> = {
    [GameSymbol.ROCK]: 'assets/rock-svgrepo-com.svg',
    [GameSymbol.PAPER]: 'assets/rolled-up-newspaper-svgrepo-com.svg',
    [GameSymbol.SCISSORS]: 'assets/scissors-svgrepo-com.svg',
  };
}
