import { Component, inject, signal } from '@angular/core';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

/**
 * This component encapsulates the player configuration. Currently, this only includes the username. Once the username is chosen, the player can navigate to the game-page.
 */
@Component({
  selector: 'app-player-config',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    ReactiveFormsModule,
    MatButton,
  ],
  template: `
    <div class="flex flex-col items-center gap-6">
      <h2 class="text-4xl">Enter your name</h2>
      <form>
        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label>
          <input
            matInput
            placeholder="Your name"
            [formControl]="playerName"
            required
            (blur)="updateErrorMessage()"
          />
          @if (playerName.invalid) {
            <mat-error>{{ errorMessage() }}</mat-error>
          }
        </mat-form-field>
      </form>
      <button
        matButton="filled"
        [disabled]="!playerName.value"
        (click)="navigateToGame()"
      >
        Play game
      </button>
    </div>
  `,
  styles: ``,
})
export class PlayerConfig {
  protected playerName = new FormControl('', [Validators.required]);
  protected errorMessage = signal('');
  private readonly router = inject(Router);

  constructor() {
    merge(this.playerName.statusChanges, this.playerName.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  protected navigateToGame(): void {
    this.router.navigate(['/game', this.playerName.value]);
  }

  protected updateErrorMessage(): void {
    if (this.playerName.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else {
      this.errorMessage.set('');
    }
  }
}
