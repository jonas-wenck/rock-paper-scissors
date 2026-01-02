import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        RouterLink
    ],
    template: `
        <main>
            <a [routerLink]="['/']">
                <header class=" brand-name">
                    <p>Rock paper scissors</p>
                </header>
            </a>
            <section class="content">
                <router-outlet/>
            </section>
        </main>`,
    styleUrls: ['./app.css'],
})
export class App {
}
