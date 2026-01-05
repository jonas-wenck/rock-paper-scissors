import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-error-pop-up',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
  template: `
    <h2 mat-dialog-title>Error</h2>
    <mat-dialog-content
      >A server error occurred, please try again later!</mat-dialog-content
    >
    <mat-dialog-actions>
      <button matButton mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styles: ``,
})
export class ErrorPopUp {}
