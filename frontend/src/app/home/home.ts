import { Component } from '@angular/core';
import { PlayerConfig } from '../player-config/player-config';

@Component({
  selector: 'app-home',
  imports: [PlayerConfig],
  template: `
    <section>
      <app-player-config />
    </section>
  `,
  styleUrls: [],
})
export class Home {}
