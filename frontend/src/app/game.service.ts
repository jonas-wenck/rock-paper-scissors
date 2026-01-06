import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { GameSymbol } from './types/game-symbol';
import { GameRecord } from './types/game-record';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  url = environment.apiUrl;
  private httpClient = inject(HttpClient);

  /**
   * Play a game of rock, paper, scissors.
   * @param symbol the symbol chosen by the player
   * @param playerName the name of the player
   */
  postGame(symbol: GameSymbol, playerName: string): Observable<GameRecord> {
    // create the request with the player symbol
    const request = { playerSymbol: symbol, playerName: playerName };

    return (
      this.httpClient
        // the API key is added in the NestJS backend for frontend
        .post<GameRecord>(this.url, request)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.logError(error, request);
            return throwError(() => 'An error occurred!');
          }),
        )
    );
  }

  /**
   * Get all game records.
   */
  getGameRecords(): Observable<[GameRecord]> {
    return (
      this.httpClient
        // the API key is added in the NestJS backend for frontend
        .get<[GameRecord]>(this.url)
        .pipe(
          catchError((error) => {
            this.logError(error, null);
            return throwError(() => 'An error occurred!');
          }),
        )
    );
  }

  /**
   * Properly log an HTTP error.
   * @param error the HTTP error
   * @param request the optional request
   */
  private logError(error: HttpErrorResponse, request?: any): void {
    console.error('A server-side error occurred!', {
      url: error.url,
      status: error.status,
      message: error.message,
      backendError: error.error,
      requestPayload: request,
    });
  }
}
