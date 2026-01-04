import {Component, inject} from '@angular/core';
import {
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable,
    MatTextColumn
} from "@angular/material/table";
import {Observable} from "rxjs";
import {GetGameRecordsResponse} from "../get-game-records-response";
import {GameService} from "../game.service";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'app-game-records',
    imports: [
        MatTable,
        MatTextColumn,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRow,
        MatRowDef,
        AsyncPipe
    ],
    template: `
        <div class="flex items-center m-4">
            @if (getGameRecordsResponseObservable | async; as response) {
                <table mat-table [dataSource]="response.gameRecords">
                    <mat-text-column name="playerName" headerText="Name"></mat-text-column>
                    <mat-text-column name="playerSymbol" headerText="Player symbol"></mat-text-column>
                    <mat-text-column name="opponentSymbol" headerText="Opponent symbol"></mat-text-column>
                    <mat-text-column name="result" headerText="Result"></mat-text-column>
                    <mat-text-column name="timestamp" headerText="Timestamp"></mat-text-column>
                    <tr mat-header-row *matHeaderRowDef="columnsToDisplay"></tr>
                    <tr mat-row *matRowDef="let myRowData; columns: columnsToDisplay"></tr>
                </table>
            }

        </div>
    `,
    styles: ``,
})
export class GameRecords {
    gameService: GameService = inject(GameService);
    getGameRecordsResponseObservable: Observable<GetGameRecordsResponse> | null = null;

    columnsToDisplay = ['playerName', 'playerSymbol', 'opponentSymbol', 'result', 'timestamp'];

    constructor() {
        // retrieve the game records from the API, this simple implementation without a proper datasource is sufficient here
        this.getGameRecordsResponseObservable = this.gameService.getGameRecords();
    }

}
