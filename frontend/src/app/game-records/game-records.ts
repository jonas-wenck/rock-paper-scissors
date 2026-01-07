import { Component, inject } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTextColumn,
} from '@angular/material/table';
import { catchError, EMPTY, Observable } from 'rxjs';
import { GameService } from '../game.service';
import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { GameResultPipe } from '../pipes/game-result-pipe';
import { GameRecord } from '../types/game-record';
import { ErrorPopUp } from '../error-pop-up/error-pop-up';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-game-records',
  imports: [
    MatTable,
    MatTextColumn,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    AsyncPipe,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    DatePipe,
    TitleCasePipe,
    GameResultPipe,
  ],
  template: `
    <div class="flex flex-col items-center gap-6">
      <h2 class="text-4xl text-center">Game records</h2>
      <div class="flex items-center m-4">
        @if (gameRecordsObservable | async; as gameRecords) {
          @if (gameRecords && gameRecords.length > 0) {
            <table mat-table [dataSource]="gameRecords">
              <mat-text-column
                name="playerName"
                headerText="Name"
              ></mat-text-column>
              <ng-container matColumnDef="playerSymbol">
                <th mat-header-cell *matHeaderCellDef>Player symbol</th>
                <td mat-cell *matCellDef="let row">
                  {{ row.playerSymbol | titlecase }}
                </td>
              </ng-container>
              <ng-container matColumnDef="opponentSymbol">
                <th mat-header-cell *matHeaderCellDef>Opponent symbol</th>
                <td mat-cell *matCellDef="let row">
                  {{ row.opponentSymbol | titlecase }}
                </td>
              </ng-container>
              <ng-container matColumnDef="result">
                <th mat-header-cell *matHeaderCellDef>Result</th>
                <td mat-cell *matCellDef="let row">
                  {{ row.result | gameresult }}
                </td>
              </ng-container>
              <ng-container matColumnDef="timestamp">
                <th mat-header-cell *matHeaderCellDef>Timestamp</th>
                <td mat-cell *matCellDef="let row">
                  {{ row.timestamp | date: 'long' }}
                </td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="columnsToDisplay"></tr>
              <tr mat-row *matRowDef="let row; columns: columnsToDisplay"></tr>
            </table>
          } @else {
            <p class="m-auto">
              There are no game records yet. Start playing to create some!
            </p>
          }
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class GameRecords {
  protected columnsToDisplay = [
    'playerName',
    'playerSymbol',
    'opponentSymbol',
    'result',
    'timestamp',
  ];
  protected gameRecordsObservable: Observable<[GameRecord]> | null = null;
  private readonly gameService: GameService = inject(GameService);
  private readonly dialog = inject(MatDialog);

  constructor() {
    // retrieve the game records from the API, this simple implementation without a proper datasource is sufficient here
    this.gameRecordsObservable = this.gameService.getGameRecords().pipe(
      catchError(() => {
        this.showErrorDialog();
        return EMPTY;
      }),
    );
  }

  private showErrorDialog(): void {
    this.dialog.open(ErrorPopUp, {});
  }
}
