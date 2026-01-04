import { inject, Injectable } from '@angular/core';
import { PostGameResponse } from './types/post-game-response';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { GetGameRecordsResponse } from './types/get-game-records-response';
import { GameSymbol } from './types/game-symbol';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  url = environment.apiUrl;
  private httpClient = inject(HttpClient);

  postGame(
    symbol: GameSymbol,
    playerName: string,
  ): Observable<PostGameResponse> {
    // create the request with the player symbol
    const request = { playerSymbol: symbol, playerName: playerName };

    return (
      this.httpClient
        // the API key is added in the NestJS backend for frontend
        .post<PostGameResponse>(this.url + '/game', request)
        .pipe(
          catchError(() => {
            throw new Error('An error occurred!');
          }),
        )
    );
  }

  getGameRecords(): Observable<GetGameRecordsResponse> {
    return (
      this.httpClient
        // the API key is added in the NestJS backend for frontend
        .get<GetGameRecordsResponse>(this.url + '/game-records')
        .pipe(
          catchError(() => {
            throw new Error('An error occurred!');
          }),
        )
    );
  }
}
