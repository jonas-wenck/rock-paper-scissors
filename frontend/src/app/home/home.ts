import {Component} from '@angular/core';
import {Game} from "../game/game";

@Component({
    selector: 'app-home',
    imports: [
        Game
    ],
    template: `
        <section>
            <app-game/>
        </section>
    `,
    styleUrls: [],
})
export class Home {


}
