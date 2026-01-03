import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatIcon, MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        RouterLink,
        MatIcon
    ],
    template: `
        <main>
            <a routerLink='/'>
                <header class="items-center flex flex-col m-4 pb-4 w-full border-b-2">
                    <h1>
                        <mat-icon aria-hidden="true" svgIcon="rock" class="align-middle"></mat-icon>
                        Rock
                        <mat-icon aria-hidden="true" svgIcon="paper" class="align-middle"></mat-icon>
                        Paper
                        <mat-icon aria-hidden="true" svgIcon="scissors" class="align-middle"></mat-icon>
                        Scissors
                    </h1>
                </header>
            </a>
            <section class="content">
                <router-outlet/>
            </section>
        </main>`,
    styleUrls: [],
})
export class App {

    constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        // add the SVG icons in the root component
        iconRegistry.addSvgIcon(
            'rock', domSanitizer.bypassSecurityTrustResourceUrl('../../assets/rock-svgrepo-com.svg'));
        iconRegistry.addSvgIcon(
            'paper', domSanitizer.bypassSecurityTrustResourceUrl('../../assets/rolled-up-newspaper-svgrepo-com.svg'));
        iconRegistry.addSvgIcon(
            'scissors', domSanitizer.bypassSecurityTrustResourceUrl('../../assets/scissors-svgrepo-com.svg'));
    }
}
