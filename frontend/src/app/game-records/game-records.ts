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
import { Observable } from 'rxjs';
import { GameService } from '../game.service';
import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { GameResultPipe } from '../pipes/game-result-pipe';
import { GameRecord } from '../types/game-record';

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
  `,
  styles: ``,
})
export class GameRecords {
  gameService: GameService = inject(GameService);
  gameRecordsObservable: Observable<[GameRecord]> | null = null;

  columnsToDisplay = [
    'playerName',
    'playerSymbol',
    'opponentSymbol',
    'result',
    'timestamp',
  ];

  constructor() {
    // retrieve the game records from the API, this simple implementation without a proper datasource is sufficient here
    this.gameRecordsObservable = this.gameService.getGameRecords();
  }
}
