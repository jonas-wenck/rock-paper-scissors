import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatIcon, MatButton],
  template: `
    <div class="flex flex-col h-screen">
      <!-- we only add vertical margin because we have no margin-right for some reason if we add it all around -->
      <header
        class="relative flex flex-col sm:flex-row items-center my-4 pb-4 w-full border-b-2 gap-4 sm:gap-0"
      >
        <!-- always center -->
        <a
          routerLink="/"
          class="sm:absolute sm:left-1/2 sm:-translate-x-1/2"
          aria-label="Back to homepage"
        >
          <h1 class="m-0 flex items-center gap-1 text-2xl">
            <mat-icon
              aria-hidden="true"
              svgIcon="rock"
              class="align-middle"
            ></mat-icon>
            Rock
            <mat-icon
              aria-hidden="true"
              svgIcon="paper"
              class="align-middle"
            ></mat-icon>
            Paper
            <mat-icon
              aria-hidden="true"
              svgIcon="scissors"
              class="align-middle"
            ></mat-icon>
            Scissors
          </h1>
        </a>
        <!-- right and below on mobile -->
        <a
          matButton="outlined"
          routerLink="/game-records"
          class="sm:ml-auto sm:mr-4"
          >Game records</a
        >
      </header>
      <main class="grow">
        <section class="content">
          <router-outlet />
        </section>
      </main>
      <footer>
        <p class="text-center">© 2026 Jonas Wenck</p>
      </footer>
    </div>
  `,
  styleUrls: [],
})
export class App {
  constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    // add the SVG icons in the root component
    iconRegistry.addSvgIcon(
      'rock',
      domSanitizer.bypassSecurityTrustResourceUrl(
        '../../assets/rock-svgrepo-com.svg',
      ),
    );
    iconRegistry.addSvgIcon(
      'paper',
      domSanitizer.bypassSecurityTrustResourceUrl(
        '../../assets/rolled-up-newspaper-svgrepo-com.svg',
      ),
    );
    iconRegistry.addSvgIcon(
      'scissors',
      domSanitizer.bypassSecurityTrustResourceUrl(
        '../../assets/scissors-svgrepo-com.svg',
      ),
    );
  }
}
