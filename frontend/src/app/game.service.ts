import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { GameSymbol } from './types/game-symbol';
import { GameRecord } from './types/game-record';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  url = environment.apiUrl;
  private httpClient = inject(HttpClient);

  postGame(symbol: GameSymbol, playerName: string): Observable<GameRecord> {
    // create the request with the player symbol
    const request = { playerSymbol: symbol, playerName: playerName };

    return (
      this.httpClient
        // the API key is added in the NestJS backend for frontend
        .post<GameRecord>(this.url, request)
        .pipe(
          catchError(() => {
            throw new Error('An error occurred!');
          }),
        )
    );
  }

  getGameRecords(): Observable<[GameRecord]> {
    return (
      this.httpClient
        // the API key is added in the NestJS backend for frontend
        .get<[GameRecord]>(this.url)
        .pipe(
          catchError(() => {
            throw new Error('An error occurred!');
          }),
        )
    );
  }
}
